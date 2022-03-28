import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
// 保留以前的el-icons
import '@/assets/font/element-icons/index.css'
// 注册全局组件
import { RegisterComponents } from "./plugins/registerComponents";
// 全局注册指令
import { RegisterDirectives } from "./plugins/registerDirectives";
// 注册全局element plus
import installElementPlus from './plugins/elementPlus'
import '@/router/routerInject'
/* 模拟数据 */
import '@/api/mockjs'
// let openMockJs = true
// if (import.meta.env.DEV && openMockJs) {
// }
createApp(App)
.use(router)
.use(store)
.use(installElementPlus)
.use(RegisterComponents)
.use(RegisterDirectives)
.mount('#app')