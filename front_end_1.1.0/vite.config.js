import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     extensions: ['.js', '.vue'],
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
// })

module.exports = {
  // 判断是否是开发模式，不是就修改路径 ./
  publicPath: process.env.NODE_ENV === 'development'
    ? '/' : './',
  // 编译后自动打开
  devServer: {
    open: true
  },
  plugins: [
        vue(),
      ],
      resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
}
