import { defineConfig } from 'vite'
import path from "node:path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { outDir: "../api/pb_public" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
