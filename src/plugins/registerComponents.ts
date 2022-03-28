import { App } from 'vue'
import IconFont from '@/components/IconFont/index.vue'
const components = [
  IconFont
]
export const RegisterComponents = {
  install: (app: App<Element>): void => {
    // 全局注册components
    components.forEach(c => {
      app.component(c.name, c)
    })
  }
}