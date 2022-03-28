import { createApp } from 'vue'
import { globalRegister } from './global/index'
import myRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

import './registerServiceWorker'

const app = createApp(App)

// globalRegister(app)
app.use(globalRegister)

app.use(router)
app.use(store)
app.mount('#app')

myRequest.request({
  url: '/home/multidata',
  method: 'GET'
})

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

// myRequest.request({
//   url: 'http://123.207.32.32:8000',
//   method: 'GET'
// })

// console.log(process.env.VUE_APP_BASE_URL)
/**
 *
 * 如果传入的是对象，会默认执行里面的install方法
 * app.use({
 *  install: () => {}
 * })
 * 如果传入的是函数，会执行这个函数
 * app.use(() => {})
 *
 */
