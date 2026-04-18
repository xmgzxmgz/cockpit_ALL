import { roomLayoutApi, type RoomLayoutResponse, type CabinetConfigResponse, type AreaFrameResponse } from '@/api/roomLayout'
import { rackController } from './rackController'
import { getEnterpriseColor } from '@/config/enterprises'

class RoomLayoutService {
  private cache: Map<string, { rooms?: RoomLayoutResponse[]; timestamp?: number }> = new Map()
  private cacheTimeout = 5 * 60 * 1000

  async initializeRoomFromDB(roomId: string): Promise<void> {
    if (rackController.isRoomInitialized(roomId) && !this.shouldRefresh(roomId)) {
      console.log(`机房 ${roomId} 已初始化且缓存有效，跳过数据库加载`)
      return
    }

    try {
      console.log(`从数据库加载机房 ${roomId} 配置...`)

      const [roomConfig, cabinets, areaFrames] = await Promise.all([
        roomLayoutApi.getRoom(roomId).catch(() => null),
        roomLayoutApi.getRoomCabinets(roomId, false).catch(() => []),
        roomLayoutApi.getRoomAreaFrames(roomId).catch(() => [])
      ])

      if (!roomConfig) {
        console.warn(`未找到机房 ${roomId} 的数据库配置，使用前端配置`)
        return
      }

      rackController.initializeRoom(roomId, true)

      cabinets.forEach((cabinet: CabinetConfigResponse) => {
        this.updateRackFromDB(roomId, cabinet)
      })

      console.log(`机房 ${roomId} 数据库加载完成，共 ${cabinets.length} 个机柜`)
    } catch (error) {
      console.error(`加载机房 ${roomId} 数据库配置失败:`, error)
    }
  }

  private shouldRefresh(roomId: string): boolean {
    const cached = this.cache.get(roomId)
    if (!cached || !cached.timestamp) return true
    return Date.now() - cached.timestamp > this.cacheTimeout
  }

  private updateRackFromDB(roomId: string, cabinet: CabinetConfigResponse): void {
    // 直接更新机柜属性
    const layout = rackController.getRoomLayout(roomId)
    const existingRack = layout.find(r => r.id === cabinet.cabinet_id)
    
    if (existingRack) {
      // 更新现有机柜
      Object.assign(existingRack, {
        enabled: cabinet.enabled,
        enterprise: cabinet.enterprise,
        color: cabinet.color || (cabinet.enterprise ? getEnterpriseColor(cabinet.enterprise) : '#f8fafc'),
        isHidden: cabinet.is_hidden,
        visibleIndex: cabinet.visible_index || cabinet.cabinet_id,
        name: cabinet.name,
        maintainer: cabinet.maintainer,
        KHMANAGE: cabinet.manager,
        roomName: roomId + '机房',
        position: {
          row: cabinet.row_position,
          col: cabinet.col_position
        }
      })
    } else {
      console.warn(`机柜 ${cabinet.cabinet_id} 不存在，跳过更新`)
    }
  }

  async refreshRoomFromDB(roomId: string): Promise<void> {
    this.cache.delete(roomId)
    await this.initializeRoomFromDB(roomId)
  }

  async shuffleRoomLayout(roomId: string, seed?: number): Promise<boolean> {
    try {
      const result = await roomLayoutApi.shuffleRoomLayout(roomId, seed)
      console.log(`机房 ${roomId} 布局已打乱:`, result.message)
      await this.refreshRoomFromDB(roomId)
      return true
    } catch (error) {
      console.error(`打乱机房 ${roomId} 布局失败:`, error)
      return false
    }
  }

  async resetRoomLayout(roomId: string): Promise<boolean> {
    try {
      const result = await roomLayoutApi.resetRoomLayout(roomId)
      console.log(`机房 ${roomId} 布局已重置:`, result.message)
      await this.refreshRoomFromDB(roomId)
      return true
    } catch (error) {
      console.error(`重置机房 ${roomId} 布局失败:`, error)
      return false
    }
  }

  async getAreaFramesFromDB(roomId: string): Promise<AreaFrameResponse[]> {
    try {
      return await roomLayoutApi.getRoomAreaFrames(roomId)
    } catch (error) {
      console.error(`获取机房 ${roomId} 区域框架失败:`, error)
      return []
    }
  }

  async createBackup(): Promise<boolean> {
    try {
      await roomLayoutApi.createBackup()
      console.log('数据库备份创建成功')
      return true
    } catch (error) {
      console.error('数据库备份创建失败:', error)
      return false
    }
  }

  async getBackups(): Promise<any[]> {
    try {
      return await roomLayoutApi.getBackups()
    } catch (error) {
      console.error('获取备份列表失败:', error)
      return []
    }
  }

  async restoreBackup(backupId: number): Promise<boolean> {
    try {
      const result = await roomLayoutApi.restoreBackup(backupId)
      console.log('数据库恢复成功:', result.message)
      this.cache.clear()
      return true
    } catch (error) {
      console.error('数据库恢复失败:', error)
      return false
    }
  }

  async getAllRoomsFromDB(): Promise<RoomLayoutResponse[]> {
    try {
      return await roomLayoutApi.getAllRooms()
    } catch (error) {
      console.error('获取所有机房配置失败:', error)
      return []
    }
  }

  async getClickableRoomsFromDB(): Promise<string[]> {
    try {
      return await roomLayoutApi.getClickableRooms()
    } catch (error) {
      console.error('获取可点击机房列表失败:', error)
      return []
    }
  }

  async getHoverAnimationRoomsFromDB(): Promise<string[]> {
    try {
      return await roomLayoutApi.getHoverAnimationRooms()
    } catch (error) {
      console.error('获取悬停动画机房列表失败:', error)
      return []
    }
  }

  async getRoomHoverAnimationConfig(roomId: string): Promise<any> {
    try {
      return await roomLayoutApi.getRoomHoverAnimationConfig(roomId)
    } catch (error) {
      console.error(`获取机房 ${roomId} 悬停动画配置失败:`, error)
      return {
        duration: 200,
        easing: 'ease-out',
        scale: 1.05,
        shadowIntensity: 0.3
      }
    }
  }

  async updateRoomSettings(roomId: string, settings: any): Promise<boolean> {
    try {
      await roomLayoutApi.updateRoomSettings(roomId, settings)
      console.log(`机房 ${roomId} 设置已更新`)
      return true
    } catch (error) {
      console.error(`更新机房 ${roomId} 设置失败:`, error)
      return false
    }
  }

  async getCabinetStatistics(): Promise<any> {
    try {
      return await roomLayoutApi.getCabinetStatistics()
    } catch (error) {
      console.error('获取机柜统计数据失败:', error)
      return {
        totalCabinets: 0,
        shouldBillCabinets: 0,
        billedCabinets: 0,
        reservedCabinets: 0,
        enterpriseCabinets: 0,
        selfUseCabinets: 0
      }
    }
  }

  async getRoomCabinetStatistics(roomId: string): Promise<any> {
    try {
      return await roomLayoutApi.getRoomCabinetStatistics(roomId)
    } catch (error) {
      console.error(`获取机房 ${roomId} 统计数据失败:`, error)
      return {
        totalCabinets: 0,
        usedCabinets: 0,
        freeCabinets: 0,
        usageRate: 0
      }
    }
  }
}

export const roomLayoutService = new RoomLayoutService()

export async function initializeRoom(roomId: string): Promise<void> {
  await roomLayoutService.initializeRoomFromDB(roomId)
}

export async function refreshRoom(roomId: string): Promise<void> {
  await roomLayoutService.refreshRoomFromDB(roomId)
}

export async function shuffleRoomLayout(roomId: string, seed?: number): Promise<boolean> {
  return await roomLayoutService.shuffleRoomLayout(roomId, seed)
}

export async function resetRoomLayout(roomId: string): Promise<boolean> {
  return await roomLayoutService.resetRoomLayout(roomId)
}