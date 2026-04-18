// 机柜控制器 - 用于管理不同机房的机柜布局
import { getEnterpriseColor } from '@/config/enterprises'
import { getRoomGridInfo, getRoomMaxRacks } from '@/config/roomConfig'

export interface RackConfig {
  id: number
  enabled: boolean // 控制机柜是否显示
  enterprise: string | null
  color: string
  position: {
    row: number
    col: number
  }
  isHidden?: boolean // 新增：标记是否隐藏显示
  visibleIndex?: number // 新增：未隐藏机柜的序号
  name: string | null
  maintainer?: string | null // 新增：维护人信息
  KHMANAGE?: string | null // 新增：客户经理
  roomName?: string | null
}

export interface RoomRackLayout {
  roomId: string
  racks: Map<number, RackConfig> // 使用Map以便快速查找
}

// 用于序列化的接口
interface SerializableRoomConfig {
  roomId: string
  racks: [number, RackConfig][] // 序列化后的格式
}

export class RackController {
  private roomLayouts: Map<string, RoomRackLayout> = new Map()

  /**
   * 获取机房网格信息
   * @param roomId 机房ID
   * @returns 网格信息
   */
  getRoomGridInfo(roomId: string): { cols: number; rows: number } {
    return getRoomGridInfo(roomId)
  }

  /**
   * 检查机房是否已经初始化
   * @param roomId 机房ID
   * @returns 是否已初始化
   */
  isRoomInitialized(roomId: string): boolean {
    return this.roomLayouts.has(roomId)
  }

  /**
   * 初始化机房布局
   * @param roomId 机房ID
   * @param forceReset 是否强制重置（默认false）
   */
  initializeRoom(roomId: string, forceReset: boolean = false): void {
    // 如果机房已存在且不强制重置，则跳过初始化
    if (this.roomLayouts.has(roomId) && !forceReset) {
      console.log(`机房 ${roomId} 已存在，跳过初始化`)
      return
    }

    const racks = new Map<number, RackConfig>()

    // 从配置中获取机房网格信息
    const gridInfo = getRoomGridInfo(roomId)
    const cols = gridInfo.cols
    const maxRacks = getRoomMaxRacks(roomId)

    for (let i = 1; i <= maxRacks; i++) {
      const row = Math.ceil(i / cols)
      const col = ((i - 1) % cols) + 1

      racks.set(i, {
        id: i,
        enabled: true, // 默认所有机柜都启用
        enterprise: null,
        color: '#f8fafc',
        position: { row, col },
        isHidden: false, // 默认不隐藏
        visibleIndex: i,
        name: null,
        roomName: roomId + '机房',
      })
    }

    this.roomLayouts.set(roomId, {
      roomId,
      racks,
    })
  }

  /**
   * 解析范围字符串，支持单个数字、范围和逗号分隔
   * 例如: "1-10,50,80" -> [1,2,3,4,5,6,7,8,9,10,50,80]
   */
  private parseRackRange(rangeStr: string): number[] {
    const rackIds: number[] = []
    const parts = rangeStr.split(',')

    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        // 处理范围，如 "1-10"
        const [start, end] = trimmed.split('-').map((num) => parseInt(num.trim()))
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            rackIds.push(i)
          }
        }
      } else {
        // 处理单个数字
        const num = parseInt(trimmed)
        if (!isNaN(num)) {
          rackIds.push(num)
        }
      }
    }

    return rackIds
  }

  /**
   * 使用简化语法控制机柜
   * 格式: F1-R1(1-10,50,80,true) 或 F1-R1(1-10,50,80,false)
   * @param command 控制命令字符串
   * @param enterprise 企业名称（可选）
   * @param color 自定义颜色（可选）
   */
  executeRackCommand(command: string, enterprise?: string, color?: string): boolean {
    try {
      // 解析命令格式: F1-R1(91-120,136-165,181-210,true)
      const match = command.match(/^([^(]+)\((.+),\s*(true|false)\)$/)
      if (!match) {
        console.error('命令格式错误，正确格式: F1-R1(1-10,50,80,true)')
        return false
      }

      const roomId = match[1].trim()
      const rangeStr = match[2].trim() // 直接使用match[2]作为范围字符串
      const enabled = match[3] === 'true'

      // 解析机柜范围
      const rackIds = this.parseRackRange(rangeStr)

      if (rackIds.length === 0) {
        console.error('无效的机柜范围')
        return false
      }

      // 确保机房已初始化
      if (!this.roomLayouts.has(roomId)) {
        this.initializeRoom(roomId)
      }

      // 批量设置机柜状态
      if (enabled) {
        // 开启机柜
        if (enterprise) {
          this.assignRacksToEnterprise(roomId, enterprise, rackIds, color)
        } else {
          this.setMultipleRacksEnabled(roomId, rackIds, true)
          if (color) {
            this.setMultipleRacksColor(roomId, rackIds, color)
          }
        }
      } else {
        // 关闭机柜
        this.setMultipleRacksEnabled(roomId, rackIds, false)
      }

      console.log(`成功执行命令: ${command}，影响 ${rackIds.length} 个机柜`)
      return true
    } catch (error) {
      console.error('执行机柜控制命令失败:', error)
      return false
    }
  }

  /**
   * 批量执行多个机柜控制命令
   * @param commands 命令数组
   * @param enterprise 默认企业名称
   * @param color 默认颜色
   */
  executeBatchCommands(commands: string[], enterprise?: string, color?: string): void {
    commands.forEach((command) => {
      this.executeRackCommand(command, enterprise, color)
    })
  }

  /**
   * 执行布局命令对象数组
   * @param layoutCommands 布局命令对象数组
   */
  executeLayoutCommands(
    layoutCommands: Array<{
      type: string
      target: string | number | Array<number>
      params?: any
    }>,
  ): void {
    layoutCommands.forEach((command) => {
      // 根据命令类型和目标构建字符串命令
      let commandStr = ''

      if (typeof command.target === 'string') {
        commandStr = command.target
      } else if (typeof command.target === 'number') {
        commandStr = command.target.toString()
      } else if (Array.isArray(command.target)) {
        commandStr = command.target.join(',')
      }

      // 根据命令类型添加前缀或后缀
      if (command.type === 'hide') {
        commandStr = `hide:${commandStr}`
      } else if (command.type === 'show') {
        commandStr = `show:${commandStr}`
      }

      // 执行命令
      this.executeRackCommand(commandStr, command.params?.enterprise, command.params?.color)
    })
  }

  /**
   * 控制指定机柜的开启/关闭状态
   * @param roomId 机房ID
   * @param rackId 机柜序号
   * @param enabled 是否启用
   */
  setRackEnabled(roomId: string, rackId: number, enabled: boolean): void {
    const layout = this.roomLayouts.get(roomId)
    if (!layout) {
      console.warn(`机房 ${roomId} 不存在`)
      return
    }

    const rack = layout.racks.get(rackId)
    if (!rack) {
      console.warn(`机房 ${roomId} 中机柜 ${rackId} 不存在`)
      return
    }

    rack.enabled = enabled

    // 如果关闭机柜，清除企业信息
    if (!enabled) {
      rack.enterprise = null
      rack.color = '#f8fafc'
    }
  }

  /**
   * 批量控制机柜状态
   * @param roomId 机房ID
   * @param rackIds 机柜序号数组
   * @param enabled 是否启用
   */
  setMultipleRacksEnabled(roomId: string, rackIds: number[], enabled: boolean): void {
    rackIds.forEach((rackId) => {
      this.setRackEnabled(roomId, rackId, enabled)
    })
  }

  /**
   * 设置机柜颜色
   * @param roomId 机房ID
   * @param rackId 机柜序号
   * @param color 颜色值
   * @param enterprise 企业名称（可选）
   */
  setRackColor(roomId: string, rackId: number, color: string, enterprise?: string): void {
    const layout = this.roomLayouts.get(roomId)
    if (!layout) {
      console.warn(`机房 ${roomId} 不存在`)
      return
    }

    const rack = layout.racks.get(rackId)
    if (!rack) {
      console.warn(`机房 ${roomId} 中机柜 ${rackId} 不存在`)
      return
    }

    rack.color = color
    if (enterprise) {
      rack.enterprise = enterprise
    }
  }

  /**
   * 批量设置机柜颜色
   * @param roomId 机房ID
   * @param rackIds 机柜序号数组
   * @param color 颜色值
   * @param enterprise 企业名称（可选）
   */
  setMultipleRacksColor(
    roomId: string,
    rackIds: number[],
    color: string,
    enterprise?: string,
  ): void {
    rackIds.forEach((rackId) => {
      this.setRackColor(roomId, rackId, color, enterprise)
    })
  }

  /**
   * 为企业分配机柜
   * @param roomId 机房ID
   * @param enterprise 企业名称
   * @param rackIds 机柜序号数组
   * @param customColor 自定义颜色（可选）
   */
  assignRacksToEnterprise(
    roomId: string,
    enterprise: string,
    rackIds: number[],
    customColor?: string,
  ): void {
    const color = customColor || getEnterpriseColor(enterprise)
    rackIds.forEach((rackId) => {
      this.setRackEnabled(roomId, rackId, true)
      this.setRackColor(roomId, rackId, color, enterprise)
    })
  }

  /**
   * 获取机房布局
   * @param roomId 机房ID
   * @returns 机柜配置数组
   */
  getRoomLayout(roomId: string): RackConfig[] {
    const layout = this.roomLayouts.get(roomId)
    if (!layout) {
      return []
    }

    return Array.from(layout.racks.values())
      .filter((rack) => rack.enabled)
      .sort((a, b) => (a.visibleIndex || 0) - (b.visibleIndex || 0))
  }

  /**
   * 获取机房完整布局（包含空位占位符，用于隐藏空闲机柜但保持布局）
   * @param roomId 机房ID
   * @param hideUnassigned 是否隐藏未分配企业的机柜
   * @returns 机柜配置数组
   */
  getRoomLayoutWithPlaceholders(roomId: string, hideUnassigned: boolean = false): RackConfig[] {
    const layout = this.roomLayouts.get(roomId)
    if (!layout) {
      return []
    }

    const racks = Array.from(layout.racks.values())
      .filter((rack) => rack.enabled)

    if (!hideUnassigned) {
      // 返回所有启用的机柜，确保isHidden属性正确设置
      return racks.map((rack, index) => ({
        ...rack,
        isHidden: false,
        visibleIndex: index + 1, // 添加可见机柜的序号
      }))
    }

    // 返回完整布局，但为未分配企业的机柜添加隐藏标记
    let visibleIndex = 0
    return racks.map((rack) => {
      if (!rack.enterprise) {
        // 空闲机柜：保持位置但标记为隐藏
        return {
          ...rack,
          isHidden: true,
          color: 'transparent',
        }
      } else {
        // 为可见机柜分配序号
        visibleIndex++
        return {
          ...rack,
          isHidden: false,
          visibleIndex: visibleIndex, // 添加可见机柜的序号
        }
      }
    })
  }

  /**
   * 获取机房统计信息
   * @param roomId 机房ID
   * @returns 统计信息
   */
  getRoomStats(roomId: string) {
    const layout = this.roomLayouts.get(roomId)
    if (!layout) {
      return {
        enabledRacks: 0,
        usedRacks: 0,
        enterprises: new Map(),
      }
    }

    const racks = Array.from(layout.racks.values())
    const enabledRacks = racks.filter((rack) => rack.enabled)
    const usedRacks = enabledRacks.filter((rack) => rack.enterprise)
    const enterprises = new Map()

    usedRacks.forEach((rack) => {
      if (rack.enterprise) {
        const count = enterprises.get(rack.enterprise) || 0
        enterprises.set(rack.enterprise, count + 1)
      }
    })

    return {
      enabledRacks: enabledRacks.length,
      usedRacks: usedRacks.length,
      enterprises,
    }
  }

  /**
   * 根据后端返回的客户机柜数据更新机柜颜色
   * 数据格式: [{roomId:'F1-R1', customer:'中国移动', cabinetId:'50'}, ...]
   * @param customerRackData 客户机柜数据数组
   */
  // updateRackColorsFromCustomerData(
  //   customerRackData: Array<{ roomId: string; customer: string; cabinetId: string }>,
  // ): void {
  //   customerRackData.forEach((record) => {
  //     const { roomId, customer, cabinetId } = record
  //     const rackId = parseInt(cabinetId)

  //     // 确保机房已初始化
  //     if (!this.roomLayouts.has(roomId)) {
  //       this.initializeRoom(roomId)
  //     }

  //     // 更新单个机柜的颜色
  //     this.updateSingleRackFromBackend(roomId, rackId, customer)
  //   })
  // }
  updateSingleRackFromBackend(
    roomId: string,
    rackId: number,
    customer: string,
    name: string,
    maintainer?: string,
    KHMANAGE?: string,
    roomName?: string,
  ): void {
    const layout = this.roomLayouts.get(roomId)
    if (!layout) {
      console.warn(`机房 ${roomId} 不存在`)
      return
    }

    const rack = layout.racks.get(rackId)
    if (!rack) {
      console.warn(`机房 ${roomId} 中机柜 ${rackId} 不存在`)
      return
    }

    // 设置机柜的企业和颜色
    const color = getEnterpriseColor(customer)
    rack.enterprise = customer
    rack.color = color
    rack.name = name
    rack.maintainer = maintainer || null
    rack.KHMANAGE = KHMANAGE || null
    rack.roomName = roomName || null
  }
}

export const rackController = new RackController()
