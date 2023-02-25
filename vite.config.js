import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Vant
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),

  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  /**
   * 网络
   */
  server: {
    // 代理
    proxy: {
      '/rabbit': {
        target: 'http://127.0.0.1:7001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rabbit/, '')
      },
      '/picture': {
        target: 'https://s2.loli.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/picture/, '')
      }
    }
  }
})
