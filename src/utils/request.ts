import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

// 定义后端返回数据的通用类型
interface ApiResponse<T = any> {
  code: number
  data: T
  msg: string
  success: boolean
}

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8009',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    console.log('发送请求:', config)
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    console.log('收到响应:', response)
    const { success, code, msg } = response.data
    
    // 优先根据success判断请求是否成功
    if (success) {
      // 可以根据需要添加对特定code的处理
      return response
    } else {
      // 处理业务失败的情况
      console.error(`业务错误: [${code}] ${msg}`)
      return Promise.reject(new Error(msg || '请求失败'))
    }
  },
  (error) => {
    console.error('响应错误:', error)
    
    if (error.response) {
      // HTTP状态码处理
      switch (error.response.status) {
        case 401:
          console.error('未授权，请重新登录')
          // 可以在这里添加跳转到登录页的逻辑
          // router.push('/login')
          break
        case 403:
          console.error('拒绝访问')
          break
        case 404:
          console.error('请求地址不存在')
          break
        case 500:
          console.error('服务器内部错误')
          break
        default:
          console.error(`错误: ${error.response.status}`)
      }
    } else if (error.request) {
      // 网络错误
      console.error('网络错误，请检查网络连接')
    } else {
      // 其他错误
      console.error('请求错误:', error.message)
    }
    
    return Promise.reject(error)
  },
)

export default request
