export interface ThreeSceneCallbacks {
  onRoomClick?: (roomData: RoomData) => void
  onDataUpdate?: (stats: SystemStats) => void
}

export interface SystemStats {
  // 删除 cpu, memory 字段
  disk: number
  networkTraffic: {
    in: number
    out: number
  }
}

export interface RoomData {
  id: string
  floor: number
  room: number
  position?: number
  enterprise?: string
  // 删除 cpu, memory, cpuUsage, memoryUsage 字段
  disk?: number
  temperature?: number
  diskUsage?: number
  status: 'normal' | 'alert' | 'running' | 'stopped' | 'error'
  network?: number
}

export interface ResourceMetrics {
  totalServers: number
  runningServers: number
  alertCount: number
  enterpriseCount: number
}

export interface ThresholdConfig {
  warning: number
  critical: number
}

export declare function initThreeScene(
  container: HTMLElement,
  callbacks?: ThreeSceneCallbacks,
): Promise<any>

export declare function updateFloorVisibility(floor: string | number): void

export declare function getSystemStats(): SystemStats

export declare function getRoomData(): RoomData[]

export declare function dispose(): void
