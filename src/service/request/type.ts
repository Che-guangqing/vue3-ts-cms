import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器接口
export interface MYRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any

  responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (error: any) => any
}

// MYRequestConfig接口对原来的AxiosRequestConfig接口 扩展了对拦截器的配置; 扩展了是否显示loading
export interface MYRequestConfig extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors
  showLoading?: boolean
}
