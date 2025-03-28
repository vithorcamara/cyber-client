import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/auth': {
        target: 'https://cyber-api-7lpa.onrender.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ''), // Mantenha a rota da API
      }
    }
  }
})
