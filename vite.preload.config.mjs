// :::::::::: Vite Preload Config ::::::::::
// Defines and configures build instructions for preload.js, specifically stating that it needs to be named preload, and builds as cjs

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '.vite/build',
    emptyOutDir: false,
    lib: {
      entry: 'src/preload.js',
      formats: ['cjs'],
      fileName: () => 'preload.js', // specifies filename
    },
    rollupOptions: {
      external: ['electron'],
    }
  }
});
