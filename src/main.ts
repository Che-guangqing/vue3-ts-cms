import { createApp } from 'vue'
import { globalRegister } from './global/index'

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

/**
 * 如果传入的是对象，会默认执行里面的install方法
 * app.use({
 *  install: () => {}
 * })
 * 如果传入的是函数，会执行这个函数
 * app.use(() => {})
 *
 */
