import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestInterceptors, MYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class MYRequest {
  // 有自己配置的axios实例
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
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

        // 添加loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

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

        // 移除loading
        setTimeout(() => {
          this.loading?.close()
        }, 2000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败， 错误信息~')
        } else {
          return data
        }
      },
      (err) => {
        if (err.response.status === 404) {
          console.log('404')
        }
        return err
      }
    )
  }

  request(config: MYRequestConfig): void {
    // 给单独某个接口添加拦截器
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
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
