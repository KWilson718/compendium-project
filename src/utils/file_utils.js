import { dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

export async function promptForBaseFolder(mainWindow) {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: "Choose Where To Save Your New Compendium",
        buttonLabel: "Select Folder",
        properties: ['openDirectory', 'createDirectory'],
    });
    
    if (result.canceled || !result.filePaths.length) {
        return null;
    }

    return result.filePaths[0];
}

export function createNewProject(baseFolder, projectName) {
    const projectFolder = path.join(baseFolder, projectName);

    if (!fs.existsSync(projectFolder)) {
        fs.mkdirSync(projectFolder, {recursive: true});
    } else {
        throw new Error(`Folder:'${projectName}' Already Exists in that Location`);
    }

    fs.mkdirSync(path.join(projectFolder, 'content'), {recursive: true});
    fs.mkdirSync(path.join(projectFolder, 'media'), {recursive: true});

    const compendiumJSON = {
        projectMeta: {
            title: projectName,
            created: new Date().toISOString(),
            lastModified: new Date().toISOString(),
        },
        chapters: [],
    }

    fs.writeFileSync(
        path.join(projectFolder, 'compendium.json'),
        JSON.stringify(compendiumJSON, null, 2)
    );

    return projectFolder;
}