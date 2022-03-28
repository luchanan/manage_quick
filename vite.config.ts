import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vitejs.dev/config/
const lifecycle = process.env.npm_lifecycle_event
export default defineConfig(({ mode, command }) => {
  let plugins = []
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  if (process.env.NODE_ENV === 'production') {
    if (lifecycle === 'report') {
      plugins.push(
        visualizer({ 
          open: true,
          brotliSize: true,
          filename: 'report.html'
        })
      )
    }
  }
  return {
    plugins: [
      vue(),
      // AutoImport({
      //   resolvers: [
      //     // ElementPlusResolver(),
      //     // // 自动导入
      //     // IconsResolver({
      //     //   prefix: 'Icon',
      //     // })
      //   ],
      // }),
      // 在dev环境使用Components
      // Components({
      //   resolvers: [
      //     // ElementPlusResolver(),
      //     // IconsResolver({
      //     //   enabledCollections: ['ep'],
      //     // }),
      //   ],
      // }),
      // 自动下载
      // Icons({
      //   autoInstall: true,
      // }),
      ...plugins
    ],
    build: {
      minify: 'terser',
      terserOptions: {
        // 生产环境下移除console
        compress: {
          // drop_console: true,
          pure_funcs: ['console.info', 'console.log'],
          drop_debugger: true
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
