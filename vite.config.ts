import { fileURLToPath, URL } from 'node:url'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';
import autoprefixer from 'autoprefixer'
import browserslistToEsbuild from 'browserslist-to-esbuild'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue() /** vueDevTools() */],
  build: {
    target: browserslistToEsbuild(),
    minify: false,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcsspxtoviewport8plugin({
          /** UI设计稿的宽度 */
          viewportWidth: 390,
        }),
      ],
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
