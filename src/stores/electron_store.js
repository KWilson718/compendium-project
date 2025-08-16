// :::::::::: Backend Data Store ::::::::::
// Holds localized variables that contain the key data of the compendium in local memory

import Store from 'electron-store';

const coreStore = new Store({
    defaults: {
        currentCompendiumIndex: {},
        currentCompendiumFilePath: '',
        currentCompendiumChapters: {
            contents: null,
        },
    }
});

export default coreStore;