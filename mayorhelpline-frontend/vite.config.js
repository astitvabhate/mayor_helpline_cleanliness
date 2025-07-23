import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // important for BrowserRouter to work properly
  build: {
    outDir: 'dist', // default, but explicit is better
  },
});
