import MYRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = '111'
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求成功拦截')
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log('请求失败拦截')
      return err
    },
    responseInterceptors: (config) => {
      console.log('响应成功拦截')
      return config
    },
    responseInterceptorsCatch: (err) => {
      console.log('响应失败拦截')
      return err
    }
  }
})

// 创建两个不同的实例
// const myRequest1 = new MYRequest({
//   baseUrl: '地址1'
// })
// const myRequest2 = new MYRequest({
//   baseUrl: '地址2'
// })
export default myRequest
