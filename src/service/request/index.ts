import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestInterceptors, MYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true
class MYRequest {
  // 有自己配置的axios实例
  instance: AxiosInstance

  interceptors?: MYRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: MYRequestConfig) {
    // 保存基本信息
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1、从config中取出的拦截器是对应的实例的 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 2、给所有的实例上都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
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
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close()

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

  // 给单独某个接口进行配置
  request<T>(config: MYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3、 给单独某个接口添加拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptors) {
            // res = config.interceptors.responseInterceptors(res) // 待解决类型问题
          }

          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// myRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data, res.returnCode, res.success)
//   })

// myRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false
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
