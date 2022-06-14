import { Module } from 'vuex'
import router from '@/router'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import { ILoginState } from './types'
import { IRootState } from '../types'

import { IAccount } from '@/service/login/type'

/**
 *  Module<S,R>
 *  S: 模块中state类型
 *  R: 根store中的state类型
 */

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 注册路由 userMenus => routes ;
      const routes = mapMenusToRoutes(userMenus)
      console.log(routes, '注册路由')

      // routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
      console.log(permissions, '获取用户按钮权限')
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 登录
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化请求 <完整的role/department>
      dispatch('getInitialDataAction', null, { root: true })

      // 请求用户信息数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },

    // 刷新给vuex赋值
    loadLocalLogin({ commit, dispatch }) {
      console.log('刷新给vuex赋值')

      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        // 发送初始化请求 <完整的role/department>
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('store执行---phoneLoginAction', payload)
    // }
  }
}

export default loginModule
