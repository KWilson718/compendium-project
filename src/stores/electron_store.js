import Store from 'electron-store';

const coreStore = new Store({
    defaults: {
        currentCompendium: null,
        currentCompendiumFilePath: null,
    }
});

export default coreStore;