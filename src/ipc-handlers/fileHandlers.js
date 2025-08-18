import { ipcMain, BrowserWindow } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { promptForBaseFolder, createNewProject, saveProject } from '../utils/file_utils.js';
import coreStore from '../stores/electron_store.js';
import { generateID } from '../utils/utility_functions.js';

// Creates the logic to handle file interaction based ipc calls
export default function registerFileHandlers() {
    // File create call
    ipcMain.handle('electron-file-create', async (event, projectName) =>{
        // Localized variables
        const win = BrowserWindow.getFocusedWindow();
        const baseFolder = await promptForBaseFolder(win);

        if (!baseFolder) return null;

        // Calls create new project surrounded with correct variables & error handling
        try {
            const projectPath = createNewProject(baseFolder, projectName);
            return {success: true, path: projectPath};
        }
        catch(err) {
            return {success: false, error: err.message};
        }
    });

    // Used to locate an existing project in the file system
    ipcMain.handle('electron-file-locate', async () => {
        try {
            // Localized Variables
            const win = BrowserWindow.getFocusedWindow();
            // Calls to find folder
            const folder = await promptForBaseFolder(win)

            console.log("The Folder Found Was:", folder);

            if (!folder) {
                // Returns successful data load
                return {success: false, error: "Failed To Locate Folder"};
            }

            return {success: true, folder: folder};
        }
        catch(err) {
            return {success: false, error: err.message};
        }
    });

    // Loads data from folder in file system
    ipcMain.handle('electron-file-load', async (event, projectPath, sectionId) => {
        try {
            const compendiumPath = path.join(projectPath, 'compendium.json');
            const compendium = JSON.parse(fs.readFileSync(compendiumPath, 'utf-8'));

            if (!sectionId){
                return { success: true, compendium, chapters: {} };
            }

            // Starting logic to load in specific project section if one is present
            const sectionPath = path.join(projectPath, 'content', `${sectionId}.html`);
            const sectionContent = fs.readFileSync(sectionPath, 'utf-8');

            return { success: true, compendium, sectionContent };
        }
        catch (err) {
            return { success: false, error: err.message };
        }
    });

    // Handles call to save project, returning result based on boolean success
    ipcMain.handle('electron-file-save', async (event) => {
        try {
            console.log("Saving Project");
            const result = await saveProject();
            console.log("Result from Saving Project", result);

            if (result) {
                return { success: true }
            }
            else {
                throw new Error(`Save Failed, ${result}`);
            }
        }
        catch(err) {
            return { success: false, error: err };
        }
    });

    // Handles creation of a chapter object & addition to the current compendium
    ipcMain.handle('electron-chapter-create', async (event, chapterName) => {
        try {
            // Generates Local Params
            const id = generateID();
            const now = new Date().toISOString();

            const currentIndex = coreStore.get('currentCompendiumIndex') || {};
            const currentChapters = coreStore.get('currentCompendiumChapters') || {};

            // Starting Chapter File
            const startingHTML=`
                <!--\n{\n  \"id\": \"${id}\",\n  \"title\": \"${chapterName}\",\n  \"created\": \"${now}\",\n  \"modified\": \"${now}\"\n}\n-->
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${chapterName}</title>
                </head>
                <body>
                    <h1>${chapterName}</h1>
                    <p>New chapter starts here...</p>
                </body>
                </html>
            `;

            // Takes the Core Store's currentCompendiumChapters object, and assigns 'id: startingHTML' to it
            currentChapters[id] = startingHTML;
            coreStore.set('currentCompendiumChapters', currentChapters);

            // Takes the Core Store's currentCompendiumIndex and pushes the id into the chapters: [] array
            if (!currentIndex.chapters) currentIndex.chapters = [];
            currentIndex.chapters.push(id);
            currentIndex.projectMeta.lastModified = now;
            coreStore.set('currentCompendiumIndex', currentIndex);

            return { success: true, id: id, title: chapterName };
        }
        catch (err) {
            return { success: false, error: err};
        }
    });
}