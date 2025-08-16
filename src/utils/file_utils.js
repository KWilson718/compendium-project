import { dialog } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import coreStore from '../stores/electron_store';
import { generateID, scrubSpaces } from './utility_functions';

// Calls to search for a folder location on one's file system
export async function promptForBaseFolder(mainWindow) {
    // Used to fetch the folder location
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

// Used to create a new project structure in the filesystem
export function createNewProject(baseFolder, projectName) {
    // Reworks the project name to be more filesystem friendly
    const projectFolderName = scrubSpaces(projectName);

    const projectFolder = path.join(baseFolder, projectFolderName);

    // Creates new folder for project to lie in
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

    // Creates the core file index in a json file
    fs.writeFileSync(
        path.join(projectFolder, 'compendium.json'),
        JSON.stringify(compendiumJSON, null, 2)
    );

    return projectFolder;
}

// Used to save a project to an existing location in the filesystem
export function saveProject() {
    // Pulls in data from the data store
    const compendiumJSON = coreStore.currentCompendiumIndex;
    const projectFolder = coreStore.currentCompendiumFilePath;
    
    // Writes the updated data to the file system, returning success or failure
    try {
        if (fs.existsSync(projectFolder)){
            fs.writeFileSync(
                path.join(projectFolder, 'compendium.json'),
                JSON.stringify(compendiumJSON, null, 2)
            );

            return true;
        }
        else {
            throw new Error(`Folder '${projectFolder}' was unable to be located`);
        }
    }
    catch (err) {
        return { success: false, error: err }
    }
}

// export function createChapter(chapterName) {
//     try {
//         const compendiumJSON = coreStore.currentCompendiumIndex;
//         const projectFolder = coreStore.currentCompendiumFilePath;
//         const contentFolder = path.join(projectFolder, 'content');
//         const scrubbedTitle = scrubSpaces(chapterName);
//         const id = generateID();

//         const fileName = `${id}.html`;

//         const dateNow = new Date().toISOString();

//         // const htmlTemplate = `
//         //     <!-- \n{\n  \"id\": \"${id}\",\n  \"title\": \"${chapterName}\",\n  \"created\": \"${now}\",\n  \"modified\": \"${now}\",\n  \"fileName\": \"${fileName}\"\n}\n-->
//         //     <!DOCTYPE html>
//         //     <html>
//         //         <head>
//         //             <title>${chapterName}</title>
//         //         </head>
//         //         <body>
//         //             <h1>${chapterName}</h1>
//         //             <p>New chapter starts here...</p>
//         //         </body>
//         //     </html>
//         // `;

//         // const chapterFile = {
//         //     chapterMeta: {
//         //         title: chapterName,
//         //         scrubbedTitle: scrubbedTitle,
//         //         created: new Date().toISOString(),
//         //         lastModified: new Date().toISOString(),
//         //         pageCount: 0,
//         //     },
//         //     content: {},
//         // }
//     }
//     catch (err) {
//         return { success: false, error: err };
//     }
// }