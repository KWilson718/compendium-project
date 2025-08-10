import { ipcMain, BrowserWindow } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { promptForBaseFolder, createNewProject } from '../utils/file_utils.js';

export default function registerFileHandlers() {
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
}

