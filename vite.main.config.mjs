// vite.main.config.mjs
import { defineConfig } from 'vite';


export default defineConfig({
  build: {
    outDir: '.vite/build',
    emptyOutDir: true,
    lib: {
      entry: 'src/main.js',
      formats: ['cjs'],
      fileName: () => 'main.js', // <-- Add this line
    },
    rollupOptions: {
      external: ['electron', 'electron-squirrel-startup'],
    }
  }
});
