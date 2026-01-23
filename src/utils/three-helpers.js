// 导入Three.js核心库
import * as THREE from 'three'
// 导入轨道控制器，用于相机控制
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 导入统一的企业颜色配置
import { getEnterpriseColor, getAvailableEnterprises } from '@/config/enterprises'
// 导入机柜控制器
import { rackController } from '@/utils/rackController'
// 导入机房配置
import { isRoomHoverAnimationEnabled, isRoomClickable } from '@/config/roomConfig'
// === 全局变量 ===
// 场景对象
let scene
// 相机对象
let camera
// 渲染器对象
let renderer
// 轨道控制器
let controls
// 射线投射器，用于鼠标交互检测
let raycaster
// 鼠标位置向量
let mouse
// 建筑物组，包含所有楼层和房间
let buildingGroup
// 数据流组，用于显示数据流动效果
let dataFlowGroup
// 标签组，用于显示机房名称标签
let labelGroup
// 当前显示的楼层，'all'表示显示所有楼层
let currentFloor = 'all'
// 容器DOM元素
let containerElement
// 当前悬停的机房对象
let hoveredRoom = null

// --- 新增：用于跟踪和清理异步任务的 ID ---
let animationFrameId = null // 存储 requestAnimationFrame 的 ID
let updateIntervalId = null // 存储 setInterval 的 ID

// 机房间隙因子，0.95表示机房大小缩小5%来创建间隙
const ROOM_GAP_FACTOR = 0.95

// 楼宇数据配置
const buildingConfig = {
  floors: 5, // 楼层数
  roomsPerFloor: 12, // 每层房间数（内圈6个+外圈6个）
  floorHeight: 3.0, // 楼层高度
  roomSize: { width: 2, height: 1.5, depth: 2 }, // 房间尺寸
  floorRadius: 12, // 楼层半径
}

// 存储3D对象
const meshes = {
  floors: [], // 楼层网格数组
  rooms: [], // 房间网格数组
  dataFlows: [], // 数据流网格数组
  labels: [], // 标签数组
}

// 实时数据存储
let realTimeData = {
  rooms: [], // 房间数据数组
  networkTraffic: { in: 0, out: 0 }, // 网络流量数据
  systemLoad: { disk: 0 }, // 删除 cpu, memory 字段
}

// 事件回调
let eventCallbacks = {
  onRoomClick: null, // 房间点击回调
  onDataUpdate: null, // 数据更新回调
}

// === 主要初始化函数 ===
// 异步初始化Three.js场景
export async function initThreeScene(container, callbacks = {}) {
  try {
    // 合并事件回调
    eventCallbacks = { ...eventCallbacks, ...callbacks }
    // 保存容器元素引用
    containerElement = container

    // 初始化场景
    initScene(container)
    // 初始化光照
    initLighting()
    // 生成模拟数据
    generateMockData()
    // 创建建筑物
    await createBuilding()
    // 设置交互
    setupInteractions()
    // 开始动画循环
    animate()
    // 开始实时数据更新
    startRealTimeUpdates()
    // 初始化标签可见性
    updateLabelsVisibility()

    // 输出初始化完成信息
    console.log('3D楼宇可视化系统初始化完成')
    // 返回主要对象
    return { scene, camera, renderer, controls }
  } catch (error) {
    // 捕获并输出错误
    console.error('初始化失败:', error)
    // 重新抛出错误
    throw error
  }
}

// === 场景初始化 ===
// 初始化Three.js场景
function initScene(container) {
  // 创建场景
  scene = new THREE.Scene()
  // 移除背景色，使用透明背景
  scene.background = null

  // 获取容器宽高，默认值为1920x1080
  const width = container.clientWidth || 1920
  const height = container.clientHeight || 1080
  // 创建透视相机，视野角度60度
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  // 设置相机位置
  camera.position.set(-18, 20, -18)
  // 创建WebGL渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启抗锯齿
    alpha: false, // 关闭透明度
    powerPreference: 'high-performance', // 高性能模式
  })

  // 关闭自动清除
  renderer.autoClear = false
  // 设置清除颜色为天空蓝
  renderer.setClearColor(0x87ceeb, 1)
  // 设置渲染器尺寸
  renderer.setSize(width, height)
  // 设置像素比，最大为2
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // 设置色调映射为ACES电影级
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  // 设置色调映射曝光度
  renderer.toneMappingExposure = 1.2

  // 将渲染器DOM元素添加到容器
  container.appendChild(renderer.domElement)

  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  // 开启阻尼
  controls.enableDamping = true
  // 设置阻尼系数
  controls.dampingFactor = 0.05
  // 设置最大极角，限制垂直旋转
  controls.maxPolarAngle = Math.PI / 2.2
  // 设置最小距离
  controls.minDistance = 10
  // 设置最大距离
  controls.maxDistance = 50
  // 设置控制器目标点
  controls.target.set(0, 5, 0)

  // 创建射线投射器
  raycaster = new THREE.Raycaster()
  // 创建鼠标位置向量
  mouse = new THREE.Vector2()

  // 创建建筑物组
  buildingGroup = new THREE.Group()
  // 创建数据流组
  dataFlowGroup = new THREE.Group()
  // 创建标签组
  labelGroup = new THREE.Group()
  // 将组添加到场景
  scene.add(buildingGroup)
  scene.add(dataFlowGroup)
  scene.add(labelGroup)
}

// === 光照初始化 ===
// 初始化场景光照
function initLighting() {
  // 只保留基础环境光，删除方向光
  // 创建白色环境光，亮度1.0
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
  // 将环境光添加到场景
  scene.add(ambientLight)
}

// === 数据生成 ===
// 随机获取企业名称
function getRandomEnterprise() {
  const enterprises = getAvailableEnterprises()
  return enterprises[Math.floor(Math.random() * enterprises.length)]
}

function generateMockData() {
  const rooms = []

  // 只生成指定的机房：2、3、4层的7号和9号机房
  const targetFloors = [1, 2, 3, 4, 5]
  const targetRooms = [7, 9]

  // 生成所有内圈机房（1-6号）
  for (let floor = 1; floor <= buildingConfig.floors; floor++) {
    for (let room = 1; room <= 6; room++) {
      // 修改机房ID生成规则，特定机房使用新格式
      let roomId
      if (floor === 1 && room === 1) {
        roomId = '1-1' // 101 改为 1-1
      } else if (floor === 3 && room >= 1 && room <= 6) {
        roomId = `3-${room}` // 301-306 改为 3-1 到 3-6
      } else {
        roomId = `${floor}${room.toString().padStart(2, '0')}` // 其他保持原格式
      }
      rooms.push({
        id: roomId,
        floor,
        room,
        disk: Math.random() * 100,
        temperature: 20 + Math.random() * 30,
        status: Math.random() > 0.8 ? 'alert' : 'normal',
        enterprise: Math.random() > 0.3 ? getRandomEnterprise() : null,
        network: Math.random() * 1000,
        isOuterRoom: false,
        isEnabled: true,
      })
    }
  }

  // 只生成指定的外圈机房
  for (const floor of targetFloors) {
    for (const room of targetRooms) {
      const roomId = `${floor}${room.toString().padStart(2, '0')}` // 改为：207, 209...
      rooms.push({
        id: roomId,
        floor,
        room,
        disk: Math.random() * 100,
        temperature: 20 + Math.random() * 30,
        status: Math.random() > 0.8 ? 'alert' : 'normal',
        enterprise: Math.random() > 0.3 ? getRandomEnterprise() : null,
        network: Math.random() * 1000,
        isOuterRoom: true,
        isEnabled: true,
      })
    }
  }

  realTimeData.rooms = rooms
  realTimeData.networkTraffic = {
    in: Math.random() * 1000,
    out: Math.random() * 800,
  }
  realTimeData.systemLoad = {
    disk: Math.random() * 100,
  }
}

// === 标签创建函数 ===
// 创建机房标签
function createRoomLabel(roomId, position) {
  // 创建画布
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  // 设置画布尺寸
  canvas.width = 256
  canvas.height = 64

  // 设置字体和样式
  context.font = 'Bold 24px Arial'
  context.fillStyle = 'rgba(255, 255, 255, 0.9)'
  context.strokeStyle = 'rgba(0, 0, 0, 0.8)'
  context.lineWidth = 2

  // 绘制背景
  context.fillStyle = 'rgba(0, 0, 0, 0.6)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制白色边框
  context.strokeStyle = 'rgba(255, 255, 255, 0.9)'
  context.lineWidth = 3
  context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)

  // 绘制文字
  context.fillStyle = 'rgba(255, 255, 255, 0.9)'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.strokeStyle = 'rgba(0, 0, 0, 0.8)'
  context.lineWidth = 2
  context.strokeText(roomId, canvas.width / 2, canvas.height / 2)
  context.fillText(roomId, canvas.width / 2, canvas.height / 2)

  // 创建纹理
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
  })

  // 创建几何体
  const geometry = new THREE.PlaneGeometry(4, 1)

  // 创建网格
  const labelMesh = new THREE.Mesh(geometry, material)

  // 设置位置（在机房上方）
  labelMesh.position.copy(position)
  labelMesh.position.y += 1

  // 添加用户数据
  labelMesh.userData = {
    type: 'roomLabel',
    roomId: roomId,
  }

  return labelMesh
}

// 更新标签朝向相机
function updateLabelsOrientation() {
  meshes.labels.forEach((label) => {
    if (label && camera) {
      // 让标签始终面向相机
      label.lookAt(camera.position)
    }
  })
}

// === 3D楼宇创建 ===
async function createBuilding() {
  for (let floor = 1; floor <= buildingConfig.floors; floor++) {
    await createFloor(floor)
  }
}

async function createFloor(floorNumber) {
  const yPosition = (floorNumber - 1) * buildingConfig.floorHeight
  const floorGroup = new THREE.Group()
  const outerRadius = buildingConfig.floorRadius
  const innerRadius = outerRadius * 0.5
  const hexShape = new THREE.Shape()
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const x = Math.cos(angle) * outerRadius
    const z = Math.sin(angle) * outerRadius
    if (i === 0) {
      hexShape.moveTo(x, z)
    } else {
      hexShape.lineTo(x, z)
    }
  }
  hexShape.closePath()
  const holePath = new THREE.Path()
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const x = Math.cos(angle) * innerRadius
    const z = Math.sin(angle) * innerRadius
    if (i === 0) {
      holePath.moveTo(x, z)
    } else {
      holePath.lineTo(x, z)
    }
  }
  hexShape.holes.push(holePath)
  const floorGeometry = new THREE.ExtrudeGeometry(hexShape, { depth: 0.2, bevelEnabled: false })
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.3,
    roughness: 0.7,
    transparent: true,
    opacity: 0.8,
  })
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
  floorMesh.position.y = yPosition
  floorMesh.rotation.x = -Math.PI / 2
  floorMesh.receiveShadow = true
  floorGroup.add(floorMesh)
  const edgeGeometry = new THREE.RingGeometry(outerRadius - 0.4, outerRadius + 0.4, 6)
  const edgeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  })
  const edgeMesh = new THREE.Mesh(edgeGeometry, edgeMaterial)
  edgeMesh.position.y = yPosition + 0.11
  edgeMesh.rotation.x = -Math.PI / 2
  floorGroup.add(edgeMesh)
  await createHexagonalRooms(floorGroup, floorNumber, yPosition, innerRadius, outerRadius)
  meshes.floors.push(floorGroup)
  buildingGroup.add(floorGroup)
}

// === 房间创建 ===
async function createHexagonalRooms(floorGroup, floorNumber, yPosition, innerRadius, outerRadius) {
  await createRoomRing(floorGroup, floorNumber, yPosition, innerRadius, outerRadius, 0, 6)
  const extendedInnerRadius = outerRadius * 1.2
  const extendedOuterRadius = outerRadius * 1.5
  await createRoomRing(
    floorGroup,
    floorNumber,
    yPosition,
    extendedInnerRadius,
    extendedOuterRadius,
    6,
    12,
  )
}

async function createRoomRing(
  floorGroup,
  floorNumber,
  yPosition,
  innerRadius,
  outerRadius,
  startIndex,
  endIndex,
) {
  const roomCount = endIndex - startIndex
  const angleStep = (Math.PI * 2) / roomCount
  const gapInnerRadius = innerRadius * ROOM_GAP_FACTOR
  const gapOuterRadius = outerRadius * ROOM_GAP_FACTOR

  for (let i = 0; i < roomCount; i++) {
    // 修改这一行：将旧格式改为新的数字格式
    const actualRoomNumber = startIndex + i + 1
    // 修改机房ID生成规则，特定机房使用新格式
    let roomId
    if (floorNumber === 1 && actualRoomNumber === 1) {
      roomId = '1-1' // 101 改为 1-1
    } else if (floorNumber === 3 && actualRoomNumber >= 1 && actualRoomNumber <= 6) {
      roomId = `3-${actualRoomNumber}` // 301-305 改为 3-1 到 3-6
    } else if (floorNumber === 4 && actualRoomNumber >= 1 && actualRoomNumber <= 6) {
      // 四楼特殊位置映射：原401位置显示406，原402位置显示401，以此类推
      // 位置1→显示406, 位置2→显示401, 位置3→显示402, 位置4→显示403, 位置5→显示404, 位置6→显示405
      const positionToRoomMapping = {
        1: '406', // 原401位置显示406
        2: '401', // 原402位置显示401
        3: '402', // 原403位置显示402
        4: '403', // 原404位置显示403
        5: '404', // 原405位置显示404
        6: '405', // 原406位置显示405
      }
      roomId = positionToRoomMapping[actualRoomNumber]
    } else {
      roomId = `${floorNumber}${actualRoomNumber.toString().padStart(2, '0')}` // 其他保持原格式
    }

    // 直接通过房间ID查找数据
    const roomData = realTimeData.rooms.find((room) => room.id === roomId)

    if (!roomData) {
      console.warn(`未找到房间数据：${roomId}`)
      continue
    }

    // 检查外圈机房是否开启
    if (roomData.isOuterRoom && !roomData.isEnabled) {
      // console.log(`外圈机房 ${roomData.id} 已关闭，跳过创建`)
      continue
    }

    // 计算机房中心位置用于标签定位
    // 修改标签位置计算：顺时针旋转两格 + 镜像
    let labelAngleIndex = i

    // 对所有房间进行顺时针旋转两格处理
    // 顺时针旋转两格：将索引向前移动2位
    labelAngleIndex = (i + 6) % roomCount

    // 添加镜像处理：将角度索引取负值实现Y轴镜像
    labelAngleIndex = -labelAngleIndex

    const midAngle = (-labelAngleIndex - 0.5) * angleStep
    const centerRadius = (gapInnerRadius + gapOuterRadius) / 2
    const centerX = Math.cos(midAngle) * centerRadius
    const centerZ = Math.sin(midAngle) * centerRadius
    const centerPosition = new THREE.Vector3(
      centerX,
      yPosition + buildingConfig.roomSize.height,
      centerZ,
    )

    const roomShape = new THREE.Shape()
    const angle1 = -i * angleStep
    const angle2 = (-i + 1) * angleStep

    // 使用 switch 语句根据数据决定形状
    switch (roomData.shapeType) {
      case 'L-shape':
        const midAngle = (angle1 + angle2) / 2
        const p1x = Math.cos(angle1) * gapInnerRadius
        const p1z = Math.sin(angle1) * gapInnerRadius
        const p2x = Math.cos(angle2) * gapInnerRadius
        const p2z = Math.sin(angle2) * gapInnerRadius
        const p3x = Math.cos(angle2) * (gapInnerRadius + (gapOuterRadius - gapInnerRadius) * 0.5)
        const p3z = Math.sin(angle2) * (gapInnerRadius + (gapOuterRadius - gapInnerRadius) * 0.5)
        const p5x = Math.cos(midAngle) * gapOuterRadius
        const p5z = Math.sin(midAngle) * gapOuterRadius
        const p6x = Math.cos(angle1) * gapOuterRadius
        const p6z = Math.sin(angle1) * gapOuterRadius
        roomShape.moveTo(p1x, p1z)
        roomShape.lineTo(p2x, p2z)
        roomShape.lineTo(p3x, p3z)
        roomShape.lineTo(p5x, p5z)
        roomShape.lineTo(p6x, p6z)
        roomShape.closePath()
        break

      case 'double-length':
        const v1x_dl = Math.cos(angle1) * gapInnerRadius
        const v1z_dl = Math.sin(angle1) * gapInnerRadius
        const v2x_dl = Math.cos(angle2) * gapInnerRadius
        const v2z_dl = Math.sin(angle2) * gapInnerRadius
        const rectDepth_dl = gapOuterRadius - gapInnerRadius
        const doubledRectDepth = rectDepth_dl * 2
        const midAngle_dl = (angle1 + angle2) / 2
        const normalX_dl = Math.cos(midAngle_dl)
        const normalZ_dl = Math.sin(midAngle_dl)
        const v3x_dl = v2x_dl + normalX_dl * doubledRectDepth
        const v3z_dl = v2z_dl + normalZ_dl * doubledRectDepth
        const v4x_dl = v1x_dl + normalX_dl * doubledRectDepth
        const v4z_dl = v1z_dl + normalZ_dl * doubledRectDepth
        roomShape.moveTo(v1x_dl, v1z_dl)
        roomShape.lineTo(v2x_dl, v2z_dl)
        roomShape.lineTo(v3x_dl, v3z_dl)
        roomShape.lineTo(v4x_dl, v4z_dl)
        roomShape.closePath()
        break

      default:
        const v1x = Math.cos(angle1) * gapInnerRadius
        const v1z = Math.sin(angle1) * gapInnerRadius
        const v2x = Math.cos(angle2) * gapInnerRadius
        const v2z = Math.sin(angle2) * gapInnerRadius
        const rectDepth = gapOuterRadius - gapInnerRadius
        const defaultMidAngle = (angle1 + angle2) / 2
        const normalX = Math.cos(defaultMidAngle)
        const normalZ = Math.sin(defaultMidAngle)
        const v3x = v2x + normalX * rectDepth
        const v3z = v2z + normalZ * rectDepth
        const v4x = v1x + normalX * rectDepth
        const v4z = v1z + normalZ * rectDepth
        roomShape.moveTo(v1x, v1z)
        roomShape.lineTo(v2x, v2z)
        roomShape.lineTo(v3x, v3z)
        roomShape.lineTo(v4x, v4z)
        roomShape.closePath()
        break
    }

    const roomGeometry = new THREE.ExtrudeGeometry(roomShape, {
      depth: buildingConfig.roomSize.height,
      bevelEnabled: false,
    })
    // 修复：使用roomId而不是roomData
    const roomColor = getRoomColor(roomId)
    const roomMaterial = new THREE.MeshBasicMaterial({
      color: roomColor,
      transparent: true,
      opacity: 0.8,
    })
    const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial)
    roomMesh.position.y = yPosition + 0.2
    roomMesh.rotation.x = -Math.PI / 2
    // 修复：添加roomId到userData中
    roomMesh.userData = {
      type: 'room',
      roomId: roomId, // 添加这一行
      data: roomData,
      originalColor: roomColor,
    }
    floorGroup.add(roomMesh)
    meshes.rooms.push(roomMesh)

    // 创建机房标签 - 只为内圈机房创建标签
    if (startIndex === 0) {
      // 只有内圈机房（startIndex === 0）才创建标签
      const roomLabel = createRoomLabel(roomId, centerPosition)
      // 添加楼层信息到标签的userData中
      roomLabel.userData.floor = floorNumber
      labelGroup.add(roomLabel)
      meshes.labels.push(roomLabel)
    }
  }
}

// === 辅助函数 ===
// 修改getDominantEnterprise函数，使用rackController的实际数据
function getDominantEnterprise(roomId) {
  // 从rackController获取实际的机柜布局数据
  const rackLayout = rackController.getRoomLayout(roomId)

  if (!rackLayout || rackLayout.length === 0) return null

  const enterpriseCount = {}
  rackLayout.forEach((rack) => {
    if (rack.enterprise) {
      enterpriseCount[rack.enterprise] = (enterpriseCount[rack.enterprise] || 0) + 1
    }
  })

  let dominantEnterprise = null
  let maxCount = 0
  Object.entries(enterpriseCount).forEach(([enterprise, count]) => {
    if (count > maxCount) {
      maxCount = count
      dominantEnterprise = enterprise
    }
  })
  return dominantEnterprise
}

function getRoomColor(roomId) {
  const floorNumber = parseInt(roomId.charAt(0))
  const roomNumber = parseInt(roomId.slice(-2))

  // 其他楼层和外圈机房保持原有逻辑
  if (roomNumber >= 7 && roomNumber <= 12) {
    return 0x0276db
  }

  const dominantEnterprise = getDominantEnterprise(roomId)
  if (dominantEnterprise) {
    return 0x19dfe6
  }
  return 0x6b7280
}

// === 交互设置 ===
function setupInteractions() {
  window.addEventListener('resize', onWindowResize)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  renderer.domElement.addEventListener('mousedown', onMouseDown)
  renderer.domElement.addEventListener('mouseup', onMouseUp)
  renderer.domElement.addEventListener('mousemove', onMouseMove)
}

// 导入机房点击权限检查函数
// 机房点击权限检查已在上方导入

// 记录鼠标按下时的交点对象
let mouseDownIntersect = null

function onMouseDown(event) {
  // 计算鼠标位置
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const visibleRooms = meshes.rooms.filter(
    (room) => room.visible && room.parent && room.parent.visible,
  )
  const intersects = raycaster.intersectObjects(visibleRooms)
  const validIntersects = intersects.filter((intersect) => {
    const room = intersect.object
    const roomFloorNumber = room.userData.data.floor
    if (currentFloor === 'all') return true
    return roomFloorNumber === currentFloor
  })

  // 记录按下时的交点对象
  mouseDownIntersect = validIntersects.length > 0 ? validIntersects[0] : null
}

function onMouseUp(event) {
  // 只有当按下和松开都在同一个机房对象上时才触发点击事件
  if (!mouseDownIntersect) {
    mouseDownIntersect = null
    return
  }

  // 计算鼠标位置
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const visibleRooms = meshes.rooms.filter(
    (room) => room.visible && room.parent && room.parent.visible,
  )
  const intersects = raycaster.intersectObjects(visibleRooms)
  const validIntersects = intersects.filter((intersect) => {
    const room = intersect.object
    const roomFloorNumber = room.userData.data.floor
    if (currentFloor === 'all') return true
    return roomFloorNumber === currentFloor
  })

  // 检查松开时是否还在同一个对象上
  if (validIntersects.length > 0 && mouseDownIntersect.object === validIntersects[0].object) {
    const clickedRoom = validIntersects[0].object
    const roomData = clickedRoom.userData.data

    // 检查机房是否允许点击
    if (isRoomClickable(roomData.id)) {
      if (eventCallbacks.onRoomClick) {
        eventCallbacks.onRoomClick(roomData)
      }
    } else {
      // 可选：为禁用的机房显示提示信息
      console.log(`机房 ${roomData.id} 的点击功能已禁用`)
    }
  }

  // 重置按下时的交点对象
  mouseDownIntersect = null
}

// 鼠标移动事件处理函数
function onMouseMove(event) {
  // 计算鼠标位置
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const visibleRooms = meshes.rooms.filter(
    (room) => room.visible && room.parent && room.parent.visible,
  )
  const intersects = raycaster.intersectObjects(visibleRooms)
  const validIntersects = intersects.filter((intersect) => {
    const room = intersect.object
    const roomFloorNumber = room.userData.data.floor
    if (currentFloor === 'all') return true
    return roomFloorNumber === currentFloor
  })

  // 处理悬停效果
  if (validIntersects.length > 0) {
    const newHoveredRoom = validIntersects[0].object

    // 如果悬停到新的机房
    if (hoveredRoom !== newHoveredRoom) {
      // 恢复之前悬停机房的状态
      if (hoveredRoom) {
        resetRoomHoverState(hoveredRoom)
      }

      // 设置新悬停机房的状态
      hoveredRoom = newHoveredRoom
      setRoomHoverState(hoveredRoom)
    }
  } else {
    // 鼠标不在任何机房上，恢复之前悬停机房的状态
    if (hoveredRoom) {
      resetRoomHoverState(hoveredRoom)
      hoveredRoom = null
    }
  }
}

// 设置机房悬停状态
function setRoomHoverState(roomMesh) {
  if (!roomMesh || !roomMesh.userData) return

  // 获取机房ID
  const roomId = roomMesh.userData.data?.id
  if (!roomId) return

  // 检查是否开启了悬停动画
  const animationEnabled = isRoomHoverAnimationEnabled(roomId)

  // 只有开启了动画的机房才应用缩放效果
  if (animationEnabled) {
    // 保存原始缩放比例
    if (!roomMesh.userData.originalScale) {
      roomMesh.userData.originalScale = roomMesh.scale.clone()
    }

    // 应用悬停缩放效果（放大1.03倍）
    const hoverScale = 1.06
    roomMesh.scale.set(
      roomMesh.userData.originalScale.x * hoverScale,
      roomMesh.userData.originalScale.y * hoverScale,
      roomMesh.userData.originalScale.z * hoverScale,
    )
  }

  // 改变鼠标样式（所有机房都显示pointer）
  if (renderer && renderer.domElement) {
    renderer.domElement.style.cursor = 'pointer'
  }
}

// 重置机房悬停状态
function resetRoomHoverState(roomMesh) {
  if (!roomMesh || !roomMesh.userData) return

  // 获取机房ID
  const roomId = roomMesh.userData.data?.id
  if (!roomId) return

  // 检查是否开启了悬停动画
  const animationEnabled = isRoomHoverAnimationEnabled(roomId)

  // 只有开启了动画的机房才恢复缩放比例
  if (animationEnabled && roomMesh.userData.originalScale) {
    roomMesh.scale.copy(roomMesh.userData.originalScale)
  }

  // 恢复默认鼠标样式
  if (renderer && renderer.domElement) {
    renderer.domElement.style.cursor = 'default'
  }
}

function onWindowResize() {
  if (!containerElement || !camera || !renderer) return
  const width = containerElement.clientWidth || 1920
  const height = containerElement.clientHeight || 1080
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  } else {
    if (!animationFrameId) {
      animate()
    }
  }
}

// === 楼层可见性控制 ===
// 更新标签可见性
function updateLabelsVisibility() {
  meshes.labels.forEach((label) => {
    if (label && label.userData && label.userData.floor) {
      const labelFloor = label.userData.floor
      if (currentFloor === 'all') {
        // 整体视图时只显示第五层的标签
        label.visible = labelFloor === 5
      } else {
        // 单独显示某层时显示对应楼层的标签
        label.visible = labelFloor === currentFloor
      }
    }
  })
}

export function updateFloorVisibility(floor) {
  currentFloor = floor
  meshes.floors.forEach((floorGroup, index) => {
    if (currentFloor === 'all') {
      floorGroup.visible = true
    } else {
      floorGroup.visible = index + 1 === floor
    }
  })
  // 更新标签可见性
  updateLabelsVisibility()
}

// === 实时数据更新 ===
function startRealTimeUpdates() {
  updateIntervalId = setInterval(() => {
    updateRealTimeData()
    updateRoomColors() // 只在数据更新时调用
    if (eventCallbacks.onDataUpdate) {
      eventCallbacks.onDataUpdate(getSystemStats())
    }
  }, 3600 * 1000)
}

function updateRealTimeData() {
  realTimeData.rooms.forEach((room) => {
    // 删除 cpu, memory 相关的更新代码
    room.disk += (Math.random() - 0.5) * 2
    room.disk = Math.max(0, Math.min(100, room.disk))
    room.temperature += (Math.random() - 0.5) * 2
    room.temperature = Math.max(15, Math.min(50, room.temperature))
  })

  realTimeData.systemLoad.disk += (Math.random() - 0.5) * 5
  realTimeData.systemLoad.disk = Math.max(0, Math.min(100, realTimeData.systemLoad.disk))
}

// 修改updateRoomColors函数，使用实际的机柜数据
function updateRoomColors() {
  // 遍历所有实际创建的3D模型
  meshes.rooms.forEach((roomMesh) => {
    // 从3D模型的userData中获取roomId
    const roomId = roomMesh.userData.roomId

    // 如果roomId存在，则更新颜色
    if (roomId) {
      // 使用roomId直接获取颜色
      const newColor = getRoomColor(roomId)

      // 更新材质颜色
      roomMesh.material.color.setHex(newColor)
      // 同时更新 userData 中的原始颜色，以便鼠标移开时能正确恢复
      roomMesh.userData.originalColor = newColor
    }
  })
}

// 动画循环
function animate() {
  // 检查是否已经销毁，如果是则停止动画循环
  if (!renderer || !scene || !camera) {
    return
  }

  animationFrameId = requestAnimationFrame(animate)
  if (controls) {
    controls.update()
  }
  updateLabelsOrientation() // 更新标签朝向
  renderer.render(scene, camera)
}

// === 导出的工具函数 ===
export function getSystemStats() {
  // 修改：只统计已启用的机房
  const enabledRooms = realTimeData.rooms.filter((room) => room.isEnabled)
  const totalServers = enabledRooms.length
  const runningServers = enabledRooms.filter((r) => r.status === 'normal').length
  const alertCount = enabledRooms.filter((r) => r.status === 'alert').length
  // 企业数量可以从所有数据中统计，因为即使机房关闭，企业也可能存在
  const enterpriseCount = new Set(realTimeData.rooms.map((r) => r.enterprise)).size
  return { totalServers, runningServers, alertCount, enterpriseCount }
}

export function getRoomData() {
  return realTimeData.rooms.map((room) => {
    // 获取机柜布局数据
    const rackLayout = rackController.getRoomLayout(room.id)
    const usedRacks = rackLayout
      ? rackLayout.filter((rack) => rack.enabled && rack.enterprise).length
      : 0

    return {
      ...room,
      rackLayout,
      usedRacks,
    }
  })
}

// 清理资源
export function dispose() {
  console.log('Disposing Three.js scene and resources...')
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  if (updateIntervalId) {
    clearInterval(updateIntervalId)
    updateIntervalId = null
  }
  // 清理悬停状态
  if (hoveredRoom) {
    resetRoomHoverState(hoveredRoom)
    hoveredRoom = null
  }
  if (renderer && renderer.domElement && renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (controls) {
    controls.dispose()
  }
  meshes.floors.length = 0
  meshes.rooms.length = 0
  meshes.dataFlows.length = 0
  meshes.labels.length = 0 // 清理标签数组
  scene = null
  camera = null
  renderer = null
  controls = null
  raycaster = null
  mouse = null
  buildingGroup = null
  dataFlowGroup = null
  labelGroup = null // 清理标签组
  containerElement = null
  console.log('Three.js resources disposed successfully')
}
