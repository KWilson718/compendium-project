import Store from 'electron-store';

const coreStore = new Store({
    defaults: {
        currentCompendium: {},
        currentCompendiumFilePath: '',
    }
});

export default coreStore;