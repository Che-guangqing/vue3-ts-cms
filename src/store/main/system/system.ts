import { Module } from 'vuex'

import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const pageUrlMap = {
  users: '/users/list',
  role: '/role/list',
  goods: '/goods/list',
  menu: '/menu/list',
  department: '/department/list',
  category: '/category/list'
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,

  state() {
    return {
      usersList: [],
      usersCount: 0,

      roleList: [],
      roleCount: 0,

      goodsList: [],
      goodsCount: 0,

      menuList: [],
      menuCount: 0,

      departmentList: [],
      departmentCount: 0,

      categoryList: [],
      categoryCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },

  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },

    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },

    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },

    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },

    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },

    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName
      const pageUrl = pageUrlMap[pageName]

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
