import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: './',
  css: {
    postcss: {
      plugins: [
        //autoprefixer({}), // add options if needed
      ],
    },
  },
  resolve: {
    alias: [
      //'@': fileURLToPath(new URL('./src', import.meta.url))
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
      {
        find: '@/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, '/src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'],
  },
  server: {
    port: 3000,
    proxy: {
      // https://vitejs.dev/config/server-options.html
    },
  },
})
