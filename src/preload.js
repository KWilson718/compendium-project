// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('storeAPI', {
  get: (key) => ipcRenderer.invoke('electron-store-get', key),
  set: (key, value) => ipcRenderer.invoke('electron-store-set', key, value),
  delete: (key) => ipcRenderer.invoke('electron-store-delete', key),
});

contextBridge.exposeInMainWorld('electronAPI', {
  createProject: (projectName) => ipcRenderer.invoke('electron-file-create', projectName),
  findProject: () => ipcRenderer.invoke('electron-file-locate'),
  loadProject: (projectPath) => ipcRenderer.invoke('electron-file-load', projectPath,),
  loadProjectSection: (projectPath, sectionId) => ipcRenderer.invoke('electron-file-load', projectPath, sectionId),
  saveProject: () => ipcRenderer.invoke('electron-file-save'),
})