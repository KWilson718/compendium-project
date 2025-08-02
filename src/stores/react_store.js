import { create } from 'zustand';

export const frontStore = create((set) => ({
  currentCompendium: {},
  
  setCompendium: (neo) => {
    set({ currentCompendium: neo });

    window.electronStore?.set('currentCompendium', neo);
  },

  loadCompendium: async () => {
    const stored = await window.electronStore?.get('currentCompendium');
    if (stored) {
      set({ currentCompendium: stored });
    }
  }
}));
