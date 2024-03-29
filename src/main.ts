import { createApp } from 'vue'
import { globalRegister } from './global/index'
import 'normalize.css'
import './assets/css/index.css'
import 'default-passive-events'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

import './registerServiceWorker'

const app = createApp(App)

// globalRegister(app)
app.use(globalRegister)
app.use(store)

setupStore()
app.use(router)

app.mount('#app')

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
