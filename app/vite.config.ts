import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue' // Import the Vue plugin

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  publicDir: 'downloads',
  base: './',
  build: {
    outDir: 'electron/dist',
    rollupOptions: {
      input: 'index.html'
    },
  },
  server: {
    port: 3000
  }
})

