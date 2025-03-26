import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Customize
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // Helps Vite recognize alias "~/*"
    },
  },
  // End customize
})
