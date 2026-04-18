// 机房占用率颜色工具

// 10个等级的颜色，从浅蓝到红
const OCCUPANCY_COLORS = [
  '#dbeafe', // 0-10%: 几乎空闲 - 浅蓝
  '#bfdbfe', // 10-20%
  '#93c5fd', // 20-30%
  '#60a5fa', // 30-40%
  '#3b82f6', // 40-50%: 中等 - 蓝色
  '#f59e0b', // 50-60%: 警告 - 橙色
  '#f97316', // 60-70%
  '#ef4444', // 70-80%: 高占用 - 红色
  '#dc2626', // 80-90%
  '#b91c1c', // 90-100%: 几乎满载 - 深红
]

/**
 * 根据占用率获取颜色
 * @param usageRate 占用率 (0-100)
 * @returns 对应的颜色
 */
export function getUsageRateColor(usageRate: number): string {
  if (usageRate <= 0) return OCCUPANCY_COLORS[0]
  if (usageRate >= 100) return OCCUPANCY_COLORS[9]

  const index = Math.min(Math.floor(usageRate / 10), 9)
  return OCCUPANCY_COLORS[index]
}

/**
 * 根据占用率获取颜色（带透明度）
 * @param usageRate 占用率 (0-100)
 * @param alpha 透明度 (0-1)
 * @returns 带透明度的颜色
 */
export function getUsageRateColorWithAlpha(usageRate: number, alpha: number = 0.3): string {
  const color = getUsageRateColor(usageRate)
  // 将 hex 转换为 rgba
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 根据占用率获取状态描述
 * @param usageRate 占用率 (0-100)
 * @returns 状态描述
 */
export function getUsageRateStatus(usageRate: number): string {
  if (usageRate < 30) return '空闲'
  if (usageRate < 50) return '正常'
  if (usageRate < 70) return '较忙'
  if (usageRate < 85) return '繁忙'
  return '满载'
}

/**
 * 获取颜色等级（0-9）
 * @param usageRate 占用率 (0-100)
 * @returns 颜色等级
 */
export function getUsageRateLevel(usageRate: number): number {
  if (usageRate <= 0) return 0
  if (usageRate >= 100) return 9
  return Math.min(Math.floor(usageRate / 10), 9)
}
