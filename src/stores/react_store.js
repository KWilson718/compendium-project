import { create } from 'zustand';

export const frontStore = create((set) => ({
  currentCompendiumIndex: {},
  currentCompendiumPath: '',
  currentCompendiumChapters: [],
  
  setCompendiumIndex: (neo) => {
    set({ currentCompendiumIndex: neo });

    window.storeAPI?.set('currentCompendiumIndex', neo); 
  },

  loadCompendiumIndex: async () => {
    const stored = await window.storeAPI?.get('currentCompendiumIndex');
    if (stored) {
      set({ currentCompendiumIndex: stored });
    }
  },

  setCompendiumChapters: (neo) => {
    set({ currentCompendiumChapters: neo });

    window.storeAPI?.set('currentCompendiumChapters', neo);
  },

  loadCompendiumChapters: async (neo) => {
    const stored = await window.storeAPI?.get('currentCompendiumChapters');
    if (stored) {
      set({ currentCompendiumChapters: stored });
    }
  },

  setCompendiumPath: (neo) => {
    set({ currentCompendiumPath: neo});

    window.storeAPI?.set('currentCompendiumFilePath', neo);
  },
}));
