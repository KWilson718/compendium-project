import Store from 'electron-store';

const coreStore = new Store({
    defaults: {
        currentCompendiumIndex: {},
        currentCompendiumFilePath: '',
        currentCompendiumChapters: [],
    }
});

export default coreStore;