import { create } from 'zustand';

export const frontStore = create((set) => ({
  currentCompendium: {},
  currentCompendiumPath: '',
  
  setCompendium: (neo) => {
    set({ currentCompendium: neo });

    window.storeAPI?.set('currentCompendium', neo); 
  },

  loadCompendium: async () => {
    const stored = await window.storeAPI?.get('currentCompendium');
    if (stored) {
      set({ currentCompendium: stored });
    }
  },

  setCompendiumPath: (neo) => {
    set({ currentCompendiumPath: neo});

    window.storeAPI?.set('currentCompendiumFilePath', neo);
  },
}));
