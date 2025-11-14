import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://d114h2t0c1xjpp.cloudfront.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
