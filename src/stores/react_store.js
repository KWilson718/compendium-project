import { create } from 'zustand';

export const frontStore = create((set) => ({
  currentCompendium: {},
  
  setCompendium: (neo) => {
    set({ currentCompendium: neo });

    window.storeAPI?.set('currentCompendium', neo);
  },

  loadCompendium: async () => {
    const stored = await window.storeAPI?.get('currentCompendium');
    if (stored) {
      set({ currentCompendium: stored });
    }
  }
}));
