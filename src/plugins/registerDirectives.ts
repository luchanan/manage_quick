import { App } from 'vue'
import throttle from '@/directives/throttle'
import auth from '@/directives/auth'
import { isValidKey } from '@/utils/tools'
const directives = {
  throttle,
  auth
}
export const RegisterDirectives = {
  install: (app: App<Element>): void => {
    // 全局注册directives
    Object.keys(directives).forEach((key) => {
      if (isValidKey(key, directives)) {
        app.directive(key, directives[key])
      }
    })
  }
}