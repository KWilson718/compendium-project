import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import started from 'electron-squirrel-startup';
import coreStore from './stores/electron_store';
import { promptForBaseFolder, createNewProject } from './utils/file_utils.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools(); // Uncomment to enable DevTools
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// Core Store Settings
ipcMain.handle('electron-store-get', (event, key) => {
  return coreStore.get(key);
});

ipcMain.handle('electron-store-set', (event, key, value) => {
  coreStore.set(key, value);
});

ipcMain.handle('electron-store-delete', (event, key) => {
  coreStore.delete(key);
});

ipcMain.handle('electron-file-create', async (event, projectName) =>{
  const win = BrowserWindow.getFocusedWindow();
  const baseFolder = await promptForBaseFolder(win);

  if (!baseFolder) return null;

  try {
    const projectPath = createNewProject(baseFolder, projectName);
    return {success: true, path: projectPath};
  }
  catch(err) {
    return {success: false, error: err.message};
  }
});

ipcMain.handle('electron-file-locate', async () => {
  try {
    const win = BrowserWindow.getFocusedWindow();
    const folder = await promptForBaseFolder(win)

    console.log("The Folder Found Was:", folder);

    if (!folder) {
      return {success: false, error: "Failed To Locate Folder"};
    }

    return {success: true, folder: folder};
  }
  catch(err) {
    return {success: false, error: err.message};
  }
});

ipcMain.handle('electron-file-load', async (event, projectPath, sectionId) => {
  try {
    const compendiumPath = path.join(projectPath, 'compendium.json');
    const compendium = JSON.parse(fs.readFileSync(compendiumPath, 'utf-8'));

    if (!sectionId){
      return { success: true, compendium };
    }

    const sectionPath = path.join(projectPath, 'content', `${sectionId}.html`);
    const sectionContent = fs.readFileSync(sectionPath, 'utf-8');

    return { success: true, compendium, sectionContent };
  }
  catch (err) {
    return { success: false, error: err.message };
  }
});