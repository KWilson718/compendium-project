import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../.vite/build',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
