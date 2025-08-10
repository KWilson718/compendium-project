import { ipcMain } from 'electron';
import coreStore from '../stores/electron_store';

export default function registerStoreHandlers() {
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
}