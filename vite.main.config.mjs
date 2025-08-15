// :::::::::: Vite Main Config ::::::::::
// Defines and configures build instructions for Main.js, adding in a specific file name for the build

import { defineConfig } from 'vite';


export default defineConfig({
  build: {
    outDir: '.vite/build',
    emptyOutDir: true,
    lib: {
      entry: 'src/main.js',
      formats: ['cjs'],
      fileName: () => 'main.js', // specifies filename to become main.js
    },
    rollupOptions: {
      external: ['electron', 'electron-squirrel-startup'],
    }
  }
});
