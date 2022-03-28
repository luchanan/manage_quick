import * as types from '../mutation-types'
import { asyncRouter, syncRouter } from '@/router'
import { isEmpty } from 'lodash'
import * as tools from '@/utils/tools'
import * as auth from '@/utils/auth'
import fetch from '@/utils/fetch'
/**
 * 递归过滤异步路由表，返回符合权限的路由
 * @param asyncRouter
 *
 */
function filterAsyncRouter(asyncRouter: any) {
  const accessedRouters = asyncRouter.filter((route: any) => {
    if (auth.routerHasPermisson(route)) {
      if (route.children && route.children.length) {
        let redirectArray = []
        if (route.redirect) {
          redirectArray = route.children.filter((item: any) => item.name === route.redirect.name)
        }
        route.children = filterAsyncRouter(route.children)
        if (route.redirect) {
          // 由于路由权限过滤，导致路由数组会被删除，如果存在redirect使用name指向这个不存在的路由，那么会报错，反而如果redirect是path则build不会
          if (!route.children.some((item: any) => item.name === route.redirect.name)) {
            if (redirectArray.length > 0) {
              route.redirect = redirectArray[0].path
            }
          }
        }
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  namespaced: true,
  state: {
    initAddRouters: false,
    routers: syncRouter,
    addRouters: []
  },
  getters: {
    routers: (state: any) => state.routers,
    addRouters: (state: any) => state.addRouters
  },
  actions: {
    GenerateRoutes({ commit }) {
      // 动态追加路由， 过滤无权限路由
      return new Promise(resolve => {
        let accessedRouters = []
        if (isEmpty(auth.getPermissionList())) {
          fetch.post('permission').then((res: any) => {
            tools.listBack(res, 'data', 'data', () => {
              try {
                auth.setPermissionList(res.data)
                accessedRouters = filterAsyncRouter(asyncRouter)
                commit(types.APP_SIDEBAR_MENU, accessedRouters)
                resolve('true')
              } catch (err) {
                console.error('permission save fail')
              }
            })
          })
        } else {
          accessedRouters = filterAsyncRouter(asyncRouter)
          commit(types.APP_SIDEBAR_MENU, accessedRouters)
          resolve('false')
        }
      })
    }
  },
  mutations: {
    [types.APP_SIDEBAR_MENU]: (state: any, routers: any) => {
      state.initAddRouters = true // 标志已经addRouter过了
      state.addRouters = routers
      state.routers = syncRouter.concat(routers)
    }
  }
}

export default permission
