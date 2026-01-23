// 机房数据类型定义
export interface RoomData {
  // 机房唯一标识符
  id: string
  // 机房名称
  name?: string
  // 机房描述
  description?: string
  // 布局命令数组，用于控制机柜的显示和隐藏
  layoutCommands?: Array<{
    // 命令类型
    type: string
    // 目标机柜ID或范围
    target: string | number | Array<number>
    // 命令参数
    params?: any
  }>
  // 机房状态
  status?: 'active' | 'inactive' | 'maintenance'
  // 机房容量信息
  capacity?: {
    // 总机柜数
    total: number
    // 已使用机柜数
    used: number
    // 可用机柜数
    available: number
  }
  // 机房位置信息
  location?: {
    // 楼层
    floor: number
    // 区域
    area: string
    // 坐标
    coordinates?: {
      x: number
      y: number
      z?: number
    }
  }
}

// 机柜数据类型定义
export interface RackData {
  // 机柜唯一标识符
  id: number
  // 机柜名称
  name: string
  // 机柜显示索引
  visibleIndex: number
  // 是否启用
  enabled: boolean
  // 分配的企业名称
  enterprise?: string
  // 企业全称
  enterpriseFullName?: string
  // 机柜颜色
  color: string
  // 是否隐藏
  isHidden?: boolean
  // 机柜状态
  status?: 'empty' | 'occupied' | 'maintenance' | 'reserved'
  // 机柜位置
  position?: {
    row: number
    col: number
  }
}

// 网格信息类型定义
export interface GridInfo {
  // 列数
  cols: number
  // 行数
  rows: number
  // 总单元格数
  total?: number
}

// 企业信息类型定义
export interface EnterpriseInfo {
  // 企业名称
  name: string
  // 企业全称
  fullName: string
  // 企业颜色
  color: string
  // 机柜数量
  rackCount: number
  // 企业状态
  status?: 'active' | 'inactive'
}

// API 响应类型定义已移至 rackEnterpriseApi.ts 中统一管理
// 如需使用，请从对应的 API 服务文件中导入

// 机房机柜企业数据类型
export interface RoomRackEnterpriseData {
  // 机房ID
  room_id: string
  // 企业简称
  FKHNAME: string
  // 机柜ID
  cabinet_id: string
  // 企业全称
  FENAME: string
}