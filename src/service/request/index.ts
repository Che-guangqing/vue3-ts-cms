import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { MYRequestInterceptors, MYRequestConfig } from './type'

class MYRequest {
  // 有自己配置的axios实例
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 给所有的实例上都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例 - 请求成功拦截器')
        return config
      },
      (err) => {
        console.log('所有的实例 - 请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例 - 响应成功拦截器')
        return res
      },
      (err) => {
        console.log('响应失败拦截')
        return err
      }
    )
  }

  request(config: MYRequestConfig): void {
    // 给单独某个接口添加拦截器
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors.responseInterceptors(res)
      }
      console.log(res)
    })
  }
}

// myRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })

// myRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptors: (config) => {
//       console.log('这个接口单独的 - 请求拦截器')
//       return config
//     },
//     responseInterceptors: (res) => {
//       console.log('这个接口单独的 - 响应拦截器')
//       return res
//     }
//   }
// })

export default MYRequest
