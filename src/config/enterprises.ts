// 企业配置和颜色管理
export interface EnterpriseConfig {
  name: string
  color: string
  description?: string
}

// 企业颜色配置 - 优化后的协调配色方案
// 配色原则：按企业类型分组，使用渐进色调和互补色搭配，确保视觉层次清晰
export const enterpriseColors: Record<string, string> = {
  // 示例企业
  '示例企业A': '#1890FF',
  '示例企业B': '#52C41A',
  '示例企业C': '#FA8C16',
  '示例企业D': '#F5222D',
  '示例企业E': '#722ED1',
}

// 企业详细配置 - 与优化配色方案保持一致
export const enterprises: EnterpriseConfig[] = [
  { name: '示例企业A', color: '#1890FF' },
  { name: '示例企业B', color: '#52C41A' },
  { name: '示例企业C', color: '#FA8C16' },
  { name: '示例企业D', color: '#F5222D' },
  { name: '示例企业E', color: '#722ED1' },
]

/**
 * 生成不重复的随机颜色
 * @param existingColors 已存在的颜色数组
 * @returns 新的十六进制颜色值
 */
function generateUniqueColor(existingColors: string[]): string {
  const generateRandomColor = (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  let newColor = generateRandomColor()
  // 确保生成的颜色不与现有颜色重复
  while (existingColors.includes(newColor)) {
    newColor = generateRandomColor()
  }
  
  return newColor
}

/**
 * 获取企业颜色
 * @param enterpriseName 企业名称
 * @returns 企业对应的颜色，如果不存在则返回默认颜色
 */
export function getEnterpriseColor(enterpriseName: string): string {
  console.log('getEnterpriseColor', enterpriseName)
  // 第三种情况：没有企业名称的（也就是机柜不属于任何企业）用'#6b7280'颜色
  if (!enterpriseName || enterpriseName == '' || enterpriseName == '未启用') {
    return '#6b7280'
  }
  
  // 第一种情况：企业配置里有的企业对应的颜色
  if (enterpriseColors[enterpriseName]) {
    return enterpriseColors[enterpriseName]
  }
  
  // 第二种情况：企业配置里没有的企业生成随机颜色
  // 获取所有已存在的颜色
  const existingColors = Object.values(enterpriseColors)
  
  // 生成新颜色
  const newColor = generateUniqueColor(existingColors)
  
  // 将新颜色添加到企业颜色映射中
  enterpriseColors[enterpriseName] = newColor
  
  // 同时添加到企业配置中
  enterprises.push({ name: enterpriseName, color: newColor })
  
  return newColor
}


/**
 * 获取所有可用企业列表
 * @returns 企业名称数组
 */
export function getAvailableEnterprises(): string[] {
  return enterprises.map((enterprise) => enterprise.name)
}

/**
 * 获取企业详细信息
 * @param enterpriseName 企业名称
 * @returns 企业配置信息
 */
export function getEnterpriseConfig(enterpriseName: string): EnterpriseConfig | undefined {
  return enterprises.find((enterprise) => enterprise.name === enterpriseName)
}

/**
 * 添加新企业
 * @param config 企业配置
 */
export function addEnterprise(config: EnterpriseConfig): void {
  if (!enterprises.find((e) => e.name === config.name)) {
    enterprises.push(config)
    enterpriseColors[config.name] = config.color
  }
}

/**
 * 获取企业颜色的十六进制格式
 * @param enterpriseName 企业名称
 * @returns 十六进制颜色值
 */
export function getEnterpriseColorHex(enterpriseName: string): string {
  const color = getEnterpriseColor(enterpriseName)
  // 确保返回十六进制格式
  if (color.startsWith('#')) {
    return color
  }
  return `#${color}`
}
