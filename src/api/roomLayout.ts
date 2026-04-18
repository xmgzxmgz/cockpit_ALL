import request from "@/utils/request"

export interface RoomLayoutResponse {
  room_id: string
  room_name: string | null
  cols: number
  rows: number
  max_racks: number
  default_color: string
  is_clickable: boolean
  is_hover_animation_enabled: boolean
  hover_duration: number
  hover_easing: string
  hover_scale: number
  hover_shadow_intensity: number
}

export interface CabinetConfigResponse {
  id: number
  room_id: string
  cabinet_id: number
  col_position: number
  row_position: number
  enterprise: string | null
  enabled: boolean
  color: string | null
  is_hidden: boolean
  visible_index: number | null
  name: string | null
  maintainer: string | null
  manager: string | null
}

export interface AreaFrameResponse {
  id: number
  room_id: string
  frame_id: string
  label: string | null
  rack_range: string | null
  color: string
  border_width: number
  label_position: string
}

export interface ShuffleResponse {
  room_id: string
  original_order: number[]
  shuffled_order: number[]
  shuffle_seed: string
  message: string
}

export interface BackupResponse {
  id: number
  backup_name: string
  backup_path: string | null
  backup_type: string
  backup_size: number | null
  checksum: string | null
  created_at: string
  description: string | null
}

export interface HoverAnimationConfig {
  duration: number
  easing: string
  scale: number
  shadowIntensity: number
}

export interface RoomSettingsUpdate {
  room_name?: string
  cols?: number
  rows?: number
  max_racks?: number
  default_color?: string
  is_clickable?: boolean
  is_hover_animation_enabled?: boolean
  hover_duration?: number
  hover_easing?: string
  hover_scale?: number
  hover_shadow_intensity?: number
}

export const roomLayoutApi = {
  getAllRooms(): Promise<RoomLayoutResponse[]> {
    return request.get('/api/room-layout/rooms').then(res => res.data)
  },

  getClickableRooms(): Promise<string[]> {
    return request.get('/api/room-layout/rooms/clickable').then(res => res.data)
  },

  getHoverAnimationRooms(): Promise<string[]> {
    return request.get('/api/room-layout/rooms/hover-animation').then(res => res.data)
  },

  getRoom(roomId: string): Promise<RoomLayoutResponse> {
    return request.get(`/api/room-layout/rooms/${roomId}`).then(res => res.data)
  },

  checkRoomClickable(roomId: string): Promise<{ room_id: string; is_clickable: boolean }> {
    return request.get(`/api/room-layout/rooms/${roomId}/is-clickable`).then(res => res.data)
  },

  checkRoomHoverAnimation(roomId: string): Promise<{ room_id: string; is_enabled: boolean }> {
    return request.get(`/api/room-layout/rooms/${roomId}/hover-animation`).then(res => res.data)
  },

  getRoomHoverAnimationConfig(roomId: string): Promise<HoverAnimationConfig> {
    return request.get(`/api/room-layout/rooms/${roomId}/hover-animation-config`).then(res => res.data)
  },

  getRoomDefaultColor(roomId: string): Promise<{ room_id: string; default_color: string }> {
    return request.get(`/api/room-layout/rooms/${roomId}/default-color`).then(res => res.data)
  },

  getRoomGridInfo(roomId: string): Promise<{ room_id: string; cols: number; rows: number }> {
    return request.get(`/api/room-layout/rooms/${roomId}/grid-info`).then(res => res.data)
  },

  getRoomMaxRacks(roomId: string): Promise<{ room_id: string; max_racks: number }> {
    return request.get(`/api/room-layout/rooms/${roomId}/max-racks`).then(res => res.data)
  },

  getRoomCabinets(roomId: string, enabledOnly: boolean = false): Promise<CabinetConfigResponse[]> {
    return request.get(`/api/room-layout/rooms/${roomId}/cabinets`, {
      params: { enabled_only: enabledOnly }
    }).then(res => res.data)
  },

  getRoomAreaFrames(roomId: string): Promise<AreaFrameResponse[]> {
    return request.get(`/api/room-layout/rooms/${roomId}/area-frames`).then(res => res.data)
  },

  updateRoomSettings(roomId: string, settings: RoomSettingsUpdate): Promise<RoomLayoutResponse> {
    return request.put(`/api/room-layout/rooms/${roomId}/settings`, settings).then(res => res.data)
  },

  shuffleRoomLayout(roomId: string, seed?: number): Promise<ShuffleResponse> {
    return request.post(`/api/room-layout/rooms/${roomId}/shuffle`, null, {
      params: { seed }
    }).then(res => res.data)
  },

  resetRoomLayout(roomId: string): Promise<{ room_id: string; success: boolean; message: string }> {
    return request.post(`/api/room-layout/rooms/${roomId}/reset`).then(res => res.data)
  },

  getLayoutOrder(roomId: string): Promise<any> {
    return request.get(`/api/room-layout/rooms/${roomId}/layout-order`).then(res => res.data)
  },

  updateCabinets(
    roomId: string,
    cabinetIds: number[],
    enterprise?: string,
    enabled?: boolean,
    color?: string
  ): Promise<{ success: boolean; updated_count: number; message: string }> {
    return request.put('/api/room-layout/cabinets/update', {
      room_id: roomId,
      cabinet_ids: cabinetIds,
      enterprise,
      enabled,
      color
    }).then(res => res.data)
  },

  createBackup(): Promise<BackupResponse> {
    return request.post('/api/room-layout/backup').then(res => res.data)
  },

  getBackups(limit: number = 10): Promise<BackupResponse[]> {
    return request.get('/api/room-layout/backups', {
      params: { limit }
    }).then(res => res.data)
  },

  restoreBackup(backupId: number): Promise<{ success: boolean; backup_name: string; message: string }> {
    return request.post(`/api/room-layout/backup/${backupId}/restore`).then(res => res.data)
  },

  getLatestBackup(): Promise<BackupResponse> {
    return request.get('/api/room-layout/backup/latest').then(res => res.data)
  }
}