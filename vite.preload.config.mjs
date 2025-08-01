// vite.preload.config.mjs
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '.vite/build',
    emptyOutDir: false,
    lib: {
      entry: 'src/preload.js',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['electron'],
    }
  }
});
