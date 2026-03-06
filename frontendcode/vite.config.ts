import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postcsspxtorem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 37.5, // 以iphone为准
          unitPrecision: 3, // px转rem 小数点精确到多少位
          propList: ["*"], // 所有属性都需要转换
        })
      ]
    }
  }
})
