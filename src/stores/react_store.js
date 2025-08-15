// :::::::::: Front End Store ::::::::::
// This lays out the structure of the Front End based Data Store

import { create } from 'zustand';

export const frontStore = create((set) => ({
  currentCompendiumIndex: {},
  currentCompendiumPath: '',
  currentCompendiumChapters: [],
  
  // Sets the main index of the store
  setCompendiumIndex: (neo) => {
    set({ currentCompendiumIndex: neo });

    window.storeAPI?.set('currentCompendiumIndex', neo); 
  },

  // Gets the main index of the store from deeper in the levels
  loadCompendiumIndex: async () => {
    const stored = await window.storeAPI?.get('currentCompendiumIndex');
    if (stored) {
      set({ currentCompendiumIndex: stored });
    }
  },

  // Sets the chapter array of the store
  setCompendiumChapters: (neo) => {
    set({ currentCompendiumChapters: neo });

    window.storeAPI?.set('currentCompendiumChapters', neo);
  },

  // Gets the chapter array of the store from deeper in the levels
  loadCompendiumChapters: async (neo) => {
    const stored = await window.storeAPI?.get('currentCompendiumChapters');
    if (stored) {
      set({ currentCompendiumChapters: stored });
    }
  },

  // Sets the directory path of the project being loaded
  setCompendiumPath: (neo) => {
    set({ currentCompendiumPath: neo});

    window.storeAPI?.set('currentCompendiumFilePath', neo);
  },
}));
