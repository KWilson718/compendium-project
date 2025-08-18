// :::::::::: Preload Calls ::::::::::
// Lists out Preload Functions for Main to expose to the Renderer and beyond

const { contextBridge, ipcRenderer } = require('electron');

// Creates functions for interacting with the backend based electron-store
contextBridge.exposeInMainWorld('storeAPI', {
  get: (key) => ipcRenderer.invoke('electron-store-get', key),
  set: (key, value) => ipcRenderer.invoke('electron-store-set', key, value),
  delete: (key) => ipcRenderer.invoke('electron-store-delete', key),
});

// Creates functions for interacting with backend file systems and the likes
contextBridge.exposeInMainWorld('electronAPI', {
  createProject: (projectName) => ipcRenderer.invoke('electron-file-create', projectName),
  createChapter: (chapterName) => ipcRenderer.invoke('electron-chapter-create', chapterName),
  findProject: () => ipcRenderer.invoke('electron-file-locate'),
  loadProject: (projectPath) => ipcRenderer.invoke('electron-file-load', projectPath,),
  saveProject: () => ipcRenderer.invoke('electron-file-save'),
})