import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Valentine-felicia-2026/",
  plugins: [react()], // Kita hapus bagian babel-compiler yang bikin error
})  