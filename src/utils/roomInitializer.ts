/** 机房初始化模块 - 处理机房配置和机柜控制器的协调 */
import { rackController, type RoomRackLayout } from './rackController'
import { roomConfigs, isRoomClickable, type RoomConfig } from '@/config/roomConfig'

/**
 * 初始化所有机房
 * 遍历机房配置并调用机柜控制器进行初始化
 */
export function initializeAllRooms(): void {
  // 开始初始化流程的日志记录
  console.log('开始初始化机房配置...')

  // 遍历所有机房配置进行初始化
  roomConfigs.forEach((config) => {
    try {
      // 调用机柜控制器初始化机房基础结构
      rackController.initializeRoom(config.roomId)
      console.log(`✅ 机房 ${config.roomId} 初始化成功`)

      // 遍历机房的所有机柜分配配置
      config.assignments.forEach((assignment) => {
        // 构建机柜分配命令字符串
        // 格式: "机房ID(机柜范围,启用状态)"
        const command = `${config.roomId}(${assignment.rackRange},${assignment.enabled})`

        // 执行机柜分配命令
        const success = rackController.executeRackCommand(command, assignment.enterprise)

        // 根据执行结果记录日志
        if (success) {
          console.log(
            `✅ ${assignment.enterprise} 在 ${config.roomId} 的机柜 ${assignment.rackRange} 配置成功`,
          )
        } else {
          console.error(`❌ ${assignment.enterprise} 在 ${config.roomId} 的机柜配置失败`)
        }
      })
    } catch (error) {
      // 捕获并记录机房初始化过程中的错误
      console.error(`❌ 机房 ${config.roomId} 配置失败:`, error)
    }
  })

  // 完成初始化流程的日志记录
  console.log('机房配置初始化完成！')
}

/**
 * 初始化特定机房
 * @param roomId 机房ID
 */
export function initializeRoom(roomId: string): void {
  const config = roomConfigs.find((c) => c.roomId === roomId)
  if (!config) {
    console.error(`❌ 未找到机房 ${roomId} 的配置`)
    return
  }
  try {
    rackController.initializeRoom(config.roomId)
    console.log(`✅ 机房 ${config.roomId} 初始化成功`)
    config.assignments.forEach((assignment) => {
      const command = `${config.roomId}(${assignment.rackRange},${assignment.enabled})`
      const success = rackController.executeRackCommand(command, assignment.enterprise)
      if (success) {
        console.log(`✅ ${assignment.enterprise} 机柜配置成功`)
      } else {
        console.error(`❌ ${assignment.enterprise} 机柜配置失败`)
      }
    })
  } catch (error) {
    console.error(`❌ 机房 ${roomId} 配置失败:`, error)
  }
}

/**
 * 添加新的机柜分配
 * @param roomId 机房ID
 * @param enterprise 企业名称
 * @param rackRange 机柜范围
 * @param enabled 是否启用
 * @param color 自定义颜色
 * @returns 是否成功
 */
export function addRackAssignment(
  roomId: string,
  enterprise: string,
  rackRange: string,
  enabled: boolean = true,
  color?: string,
): boolean {
  try {
    // 构建机柜分配命令字符串
    const command = `${roomId}(${rackRange},${enabled})`
    // 执行机柜分配命令
    const success = rackController.executeRackCommand(command, enterprise)

    if (success) {
      // 记录成功分配的日志
      console.log(`✅ ${enterprise} 在 ${roomId} 的机柜 ${rackRange} 分配成功`)

      // 如果指定了自定义颜色，记录颜色配置
      if (color) {
        console.log(`🎨 ${enterprise} 机柜颜色设置为: ${color}`)
      }
    } else {
      // 记录分配失败的错误日志
      console.error(`❌ ${enterprise} 在 ${roomId} 的机柜分配失败`)
    }

    return success
  } catch (error) {
    // 捕获并记录异常情况
    console.error(`❌ 机柜分配失败:`, error)
    return false
  }
}

/**
 * 获取机房状态
 * @param roomId 机房ID
 * @returns 机房状态信息
 */
export function getRoomStatus(roomId: string) {
  // 获取机房布局信息
  const layout = rackController.getRoomLayout(roomId)
  // 获取机房统计数据
  const stats = rackController.getRoomStats(roomId)
  // 查找机房配置
  const config = roomConfigs.find((c) => c.roomId === roomId)

  return {
    layout,
    stats,
    roomId,
    defaultColor: config?.defaultColor || '#4a4a4a',
  }
}

/**
 * 检查机柜是否可点击
 * @param roomId 机房ID
 * @param rackId 机柜ID
 * @returns 是否可点击
 */
export function canClickRack(roomId: string, rackId: number): boolean {
  try {
    // 检查机房是否在可点击列表中
    if (!isRoomClickable(roomId)) {
      return false
    }

    // 获取机房布局
    const layout = rackController.getRoomLayout(roomId)
    if (!layout) {
      return false
    }

    // 检查机柜是否存在于机房布局中
    return layout.some((rack) => rack.id === rackId)
  } catch (error) {
    console.error(`检查机柜点击状态失败:`, error)
    return false
  }
}
