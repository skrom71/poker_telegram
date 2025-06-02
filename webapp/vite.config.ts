import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['pokertrust.net', 'd8da-46-175-160-46.ngrok-free.app'],
  },
})
