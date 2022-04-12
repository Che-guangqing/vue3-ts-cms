import { Module } from 'vuex'

import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const pageUrlMap = {
  user: '/users/list',
  role: '/role/list'
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,

  state() {
    return {
      userList: [],
      userCount: 0,

      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    }
  },

  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },

    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName
      const pageUrl = pageUrlMap[pageName]
      // console.log(payload)

      // 发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 将数据存储到state
      const { list, totalCount } = pageResult.data
      const mutationsFunName = `change${
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      }`
      commit(`${mutationsFunName}List`, list)
      commit(`${mutationsFunName}Count`, totalCount)

      // console.log(list, totalCount, 'getPageListAction ==== ')
    }
  }
}

export default systemModule
