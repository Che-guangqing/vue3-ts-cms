import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'

import login from './login/login'
import system from './main/system/system'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色的option数据
      const departmentRes = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentRes.data

      const roleRes = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleRes.data

      // 请求角色菜单
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})
/**
 * 指定store中state 的类型后, 虽然state中添加了接口中未定义的属性，在state中不报错
 * 但是在mutations中获取state属性的时候，并不会获取到接口中未定义的属性
 */

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// 这个useStore 规定了每个模块的state的类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
