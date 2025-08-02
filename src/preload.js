// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('storeAPI', {
  get: (key) => ipcRenderer.invoke('electron-store-get', key),
  set: (key, value) => ipcRenderer.invoke('electron-store-set', key, value),
  delete: (key) => ipcRenderer.invoke('electron-store-delete', key),
});

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: () => ipcRenderer.invoke('electron-file-save'),
  saveToLastFile: () => ipcRenderer.invoke('electron-file-save-last'),
  readFile: () => ipcRenderer.invoke('electron-file-read')
})