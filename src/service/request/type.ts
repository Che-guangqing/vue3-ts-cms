import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器接口
// responseInterceptors的类型不确定 所以是通过接口传递进来，默认为AxiosResponse类型
export interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  // responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (error: any) => any
}

// MYRequestConfig接口对原来的AxiosRequestConfig接口 扩展了对拦截器的配置; 扩展了是否显示loading
export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors<T>
  showLoading?: boolean
}
