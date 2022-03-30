import { createStore } from 'vuex'
import { IRootState } from './types'

import login from './login/login'

const store = createStore<IRootState>({
  state: () => {
    return {}
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})
/**
 * 指定store中state 的类型后, 虽然state中添加了接口中未定义的属性，在state中不报错
 * 但是在mutations中获取state属性的时候，并不会获取到接口中未定义的属性
 */

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export default store
