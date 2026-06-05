import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      // 自动注入 PWA 更新处理脚本
      injectRegister: 'auto',
      // dev 模式下也生成 SW（方便测试）
      devOptions: {
        enabled: false
      },
      includeAssets: ['favicon.svg', 'favicon.ico', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Elio Viewer',
        short_name: 'Elio',
        description: '多类型代码文件查看与编辑器 — 支持 25+ 编程语言的高亮、格式化与片段补全',
        theme_color: '#1a1a2e',
        background_color: '#1a1a2e',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'zh-CN',
        start_url: '/',
        scope: '/',
        categories: ['productivity', 'developer tools', 'utilities'],
        shortcuts: [
          {
            name: '新建文档',
            url: '/?new=1',
            description: '快速新建一个文档'
          }
        ],
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'apple touch icon'
          }
        ]
      },
      workbox: {
        // 预缓存构建产物
        globPatterns: [
          '**/*.{js,css,html,svg,png,ico,woff2,webmanifest}'
        ],
        // SPA 回退：所有导航请求返回 index.html
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        // 运行时缓存策略
        runtimeCaching: [
          // Shiki 语法文件（从 unpkg CDN 加载）
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'shiki-assets',
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Google Fonts / 其他字体 CDN
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 86400 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
