// :::::::::: Vite Renderer Config ::::::::::
// Defines and configures build instructions for renderer.js, specifically adding in tailwindcss and stating the filename to build to

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './src',
  plugins: [react(), tailwindcss()], // adds in react and tailwind plugins for functionality
  build: {
    outDir: '../.vite/renderer',
    emptyOutDir: true,
  },
});
