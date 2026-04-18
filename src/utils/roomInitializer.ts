/** 机房初始化模块 - 处理机房配置和机柜控制器的协调 */
import { rackController, type RoomRackLayout } from './rackController'
import { roomConfigs, isRoomClickable, type RoomConfig } from '@/config/roomConfig'
import { roomLayoutService } from './roomLayoutService'

/**
 * 初始化所有机房
 * 遍历机房配置并调用机柜控制器进行初始化
 */
export function initializeAllRooms(): void {
  console.log('开始初始化机房配置...')

  roomConfigs.forEach((config) => {
    try {
      rackController.initializeRoom(config.roomId)
      console.log(`✅ 机房 ${config.roomId} 初始化成功`)

      config.assignments.forEach((assignment) => {
        const command = `${config.roomId}(${assignment.rackRange},${assignment.enabled})`
        const success = rackController.executeRackCommand(command, assignment.enterprise)

        if (success) {
          console.log(
            `✅ ${assignment.enterprise} 在 ${config.roomId} 的机柜 ${assignment.rackRange} 配置成功`,
          )
        } else {
          console.error(`❌ ${assignment.enterprise} 在 ${config.roomId} 的机柜配置失败`)
        }
      })
    } catch (error) {
      console.error(`❌ 机房 ${config.roomId} 配置失败:`, error)
    }
  })

  console.log('机房配置初始化完成！')
}

/**
 * 初始化特定机房（优先从数据库加载，失败则使用原始配置）
 * @param roomId 机房ID
 */
export async function initializeRoom(roomId: string): Promise<void> {
  try {
    await roomLayoutService.initializeRoomFromDB(roomId)
    console.log(`✅ 机房 ${roomId} 从数据库初始化成功`)
    // 数据库加载成功，直接返回，不再使用原始配置
    return
  } catch (error) {
    console.warn(`⚠️ 机房 ${roomId} 数据库加载失败，使用原始配置:`, error)
    const config = roomConfigs.find((c) => c.roomId === roomId)
    if (config) {
      rackController.initializeRoom(config.roomId)
      console.log(`✅ 机房 ${config.roomId} 使用原始配置初始化成功`)
      config.assignments.forEach((assignment) => {
        const command = `${config.roomId}(${assignment.rackRange},${assignment.enabled})`
        const success = rackController.executeRackCommand(command, assignment.enterprise)
        if (success) {
          console.log(`✅ ${assignment.enterprise} 机柜配置成功`)
        } else {
          console.error(`❌ ${assignment.enterprise} 机柜配置失败`)
        }
      })
    } else {
      console.error(`❌ 未找到机房 ${roomId} 的配置`)
    }
  }
}

/**
 * 同步版本初始化特定机房（仅使用原始配置）
 * @param roomId 机房ID
 */
export function initializeRoomSync(roomId: string): void {
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
    const command = `${roomId}(${rackRange},${enabled})`
    const success = rackController.executeRackCommand(command, enterprise)

    if (success) {
      console.log(`✅ ${enterprise} 在 ${roomId} 的机柜 ${rackRange} 分配成功`)

      if (color) {
        console.log(`🎨 ${enterprise} 机柜颜色设置为: ${color}`)
      }
    } else {
      console.error(`❌ ${enterprise} 在 ${roomId} 的机柜分配失败`)
    }

    return success
  } catch (error) {
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
  const layout = rackController.getRoomLayout(roomId)
  const stats = rackController.getRoomStats(roomId)
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
    if (!isRoomClickable(roomId)) {
      return false
    }

    const layout = rackController.getRoomLayout(roomId)
    if (!layout) {
      return false
    }

    return layout.some((rack) => rack.id === rackId)
  } catch (error) {
    console.error(`检查机柜点击状态失败:`, error)
    return false
  }
}

/**
 * 刷新机房数据（从数据库重新加载）
 * @param roomId 机房ID
 */
export async function refreshRoom(roomId: string): Promise<void> {
  await roomLayoutService.refreshRoomFromDB(roomId)
}

/**
 * 打乱机房布局
 * @param roomId 机房ID
 * @param seed 随机种子
 */
export async function shuffleRoomLayout(roomId: string, seed?: number): Promise<boolean> {
  return await roomLayoutService.shuffleRoomLayout(roomId, seed)
}

/**
 * 重置机房布局
 * @param roomId 机房ID
 */
export async function resetRoomLayout(roomId: string): Promise<boolean> {
  return await roomLayoutService.resetRoomLayout(roomId)
}
