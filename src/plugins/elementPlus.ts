import { App } from 'vue'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import messages from '@/utils/i18n'
import {isValidKey} from '@/utils/tools'
// 全局注册icon svg
import * as Elicons from '@element-plus/icons-vue'
const i18n = createI18n({
  locale: zhCn.name,
  fallbackLocale: en.name,
  messages,
})
export default (app: App<Element>) => {
  // 遍历注册icon svg
  Object.keys(Elicons).forEach(key => {
    if (isValidKey(key, Elicons)) {
      app.component(key, Elicons[key])
    }
  })
  app.use(ElementPlus, { locale:zhCn })
  app.use(i18n)
}
