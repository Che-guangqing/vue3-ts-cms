import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/mapMenus'

// 导入添加type  表示此出导入的是一个类型
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/notFound/notFound.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // console.log(router.getRoutes(), to)

  // 重定向
  if (to.path === '/main') {
    return firstMenu.url
  }

  // if (to.path.indexOf('/main') !== -1) {
  //   if (to.name === 'notFound') {
  //     console.log(1)
  //     to.name = 'user'
  //   }
  // }
})

export default router
