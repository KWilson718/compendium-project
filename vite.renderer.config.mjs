// vite.renderer.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './src',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../.vite/renderer',
    emptyOutDir: true,
  },
});
