import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    // ... other configurations
    chunkSizeWarningLimit: 10000, // Increase to 1MB (adjust as needed)
  },
  define: { 
    'process.env.VITE_API_URL': JSON.stringify("http://localhost:3084/v1/"), // Local
    // 'process.env.VITE_API_URL': JSON.stringify("https://social-api.apikart.co/v1/"), // Staging Server
    'process.env.BASIC_AUTH': JSON.stringify('Basic ' + btoa('socialfeed:socialfeed@$12345@'))
   },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }
})
