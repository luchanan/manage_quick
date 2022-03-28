import Cookies from 'js-cookie'
import {isNil} from 'lodash'
let PREFIX = '__'
function isEmpty (val: any) {
  if (isNil(val) || val === 'undefined' || val === '') {
    return true
  }
  return false
}
export const cookies = {
  get (name: string) {
    return Cookies.get(`${PREFIX }${name}`)
  },
  set (name: string, val: any, params = {}, validateEmpty = true) {
    if (validateEmpty && isEmpty(val)) return
    Cookies.set(`${PREFIX }${name}`, val, params)
  },
  remove (name: string, params = {}) {
    Cookies.remove(`${PREFIX }${name}`, params)
  }
}
export const localStorages = {
  get (name: string) {
    return window.localStorage.getItem(`${PREFIX }${name}`)
  },
  set (name: string, val: any) {
    if (isEmpty(val)) return
    window.localStorage.setItem(`${PREFIX }${name}`, val)
  },
  remove (name: string) {
    window.localStorage.removeItem(`${PREFIX }${name}`)
  }
}
export const sessionStorages = {
  get (name: string) {
    return window.sessionStorage.getItem(`${PREFIX }${name}`)
  },
  set (name: string, val: any) {
    if (isEmpty(val)) return
    window.sessionStorage.setItem(`${PREFIX }${name}`, val)
  },
  remove (name: string) {
    window.sessionStorage.removeItem(`${PREFIX }${name}`)
  }
}