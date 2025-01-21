import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   hmr: {
  //     protocol: 'ws',
  //     host: 'localhost',
  //     port: 5173, // Usa el puerto correcto para tu app
  //     timeout: 2000,
  //   },
  // },
})
