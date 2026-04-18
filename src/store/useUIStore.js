import { create } from 'zustand'

export const useUIStore = create((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  search: '',
  setSearch: (search) => set({ search }),
  dark: true,
  toggleDark: () => set((state) => {
    const newDark = !state.dark;
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
    return { dark: newDark };
  }),
  expandedQuest: null,
  setExpandedQuest: (id) => set((state) => ({ 
    expandedQuest: state.expandedQuest === id ? null : id 
  })),
}))
