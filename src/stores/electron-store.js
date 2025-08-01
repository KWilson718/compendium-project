import Store from 'electron-store';

const coreStore = new Store({
    defaults: {
        userPreferences: {
            theme: 'dark',
            notifications: true,
        }
    }
});

export default coreStore;