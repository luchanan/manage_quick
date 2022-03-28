
import {isEmpty, isNil} from 'lodash'
import {sessionStorages, cookies} from '@/utils/store'
// 处理权限问题
let permissionName = 'permissionList'
let tokenName = 'token'
export function existToken () {
  return !isNil(cookies.get(tokenName))
}
export function getToken () {
  return cookies.get(tokenName)
}
export function setToken (token: string) {
  cookies.set(tokenName, token)
}
export function removeToken () {
  cookies.remove(tokenName)
}
// 获取是否存在权限列表
export function getPermissionList (key: string = permissionName) {
  let list = sessionStorages.get(key)
  if (typeof list === 'string') {
    return JSON.parse(list)
  }
}
export function setPermissionList (val: any, key: string = permissionName) {
  sessionStorages.set(key, JSON.stringify(val))
}
export function removePermissionList (key: string = permissionName) {
  sessionStorages.remove(key)
}
export function signOutClear () {
  removePermissionList()
  removeToken()
}
// 判断按钮权限， 路由权限
export function hasAuth(permissionKey:string) {
  let permissions = getPermissionList()
  if (!isEmpty(permissions)) {
    return permissions.some((items: any) => items === permissionKey)
  }
}
// 判断路由是否有权限进入
export function routerHasPermisson(route:any) {
  if (route.meta.auth) {
    return hasAuth(route.meta.auth)
  } else {
    return true
  }
}