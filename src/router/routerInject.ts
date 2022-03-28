import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { existToken } from '@/utils/auth'

router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start()
  if (existToken()) {
    if (to.name === 'login') {
      // 登录了还在登录页就跳转首页
      next('/')
      NProgress.done()
    } else {
      if (!store.state.permission.initAddRouters) { // 防止重复addRoutes
        store.dispatch('permission/GenerateRoutes').then(() => {
          let addRouters = store.getters['permission/addRouters']
          addRouters.map((item: any)=>{
            router.addRoute(item)
          })
          next({ ...to }) // 保证addRoutes添加到路由，否则刷新访问不了
        })
      } else {
        next()
      }
    }
  } else {
    if (to.meta.white) {
      next()
    } else {
      next({ name: 'login' })
      NProgress.done()
    }
  }
})

router.afterEach((to: any, from: any) => {
  NProgress.done()
})

router.onError((handler: any) => {
  NProgress.done()
})
