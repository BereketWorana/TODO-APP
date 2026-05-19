// ⚡ THE SYSTEM — Quest State Management (Zustand)

import { create } from 'zustand';
import { Quest, QuestStatus, Rank } from '../types/index';
import { getQuests, saveQuests } from '../lib/storage';

interface QuestFilters {
  status: QuestStatus | 'all';
  rank: Rank | 'all';
}

interface QuestState {
  quests: Quest[];
  filters: QuestFilters;
  
  // Actions
  addQuest: (quest: Quest) => void;
  updateQuestStatus: (id: string, status: QuestStatus) => void;
  deleteQuest: (id: string) => void;
  setFilter: (filter: Partial<QuestFilters>) => void;
  getFilteredQuests: () => Quest[];
  resetDailyQuests: () => void;
  checkExpiredQuests: () => string[]; // Returns IDs of newly expired mandatory quests
}

export const useQuestStore = create<QuestState>((set, get) => ({
  quests: getQuests(),
  filters: { status: 'all', rank: 'all' },
  
  addQuest: (quest) => {
    const { quests } = get();
    const updated = [...quests, quest];
    saveQuests(updated);
    set({ quests: updated });
  },
  
  updateQuestStatus: (id, status) => {
    const { quests } = get();
    const updated = quests.map(q =>
      q.id === id
        ? { ...q, status, completedAt: status === 'completed' ? new Date().toISOString() : q.completedAt }
        : q
    );
    saveQuests(updated);
    set({ quests: updated });
  },
  
  deleteQuest: (id) => {
    const { quests } = get();
    const updated = quests.filter(q => q.id !== id);
    saveQuests(updated);
    set({ quests: updated });
  },
  
  setFilter: (filter) => {
    set({ filters: { ...get().filters, ...filter } });
  },
  
  getFilteredQuests: () => {
    const { quests, filters } = get();
    return quests.filter(q => {
      if (filters.status !== 'all' && q.status !== filters.status) return false;
      if (filters.rank !== 'all' && q.rank !== filters.rank) return false;
      return true;
    });
  },
  
  resetDailyQuests: () => {
    const { quests } = get();
    const updated = quests.map(q =>
      q.isDaily && q.status === 'completed'
        ? { ...q, status: 'active' as QuestStatus, completedAt: null }
        : q
    );
    saveQuests(updated);
    set({ quests: updated });
  },
  
  checkExpiredQuests: () => {
    const { quests } = get();
    const today = new Date().toISOString().split('T')[0];
    const expiredMandatory: string[] = [];
    
    const updated = quests.map(q => {
      if (
        q.status === 'active' &&
        q.isMandatory &&
        q.dueDate &&
        q.dueDate < today
      ) {
        expiredMandatory.push(q.id);
        return { ...q, status: 'expired' as QuestStatus };
      }
      return q;
    });
    
    if (expiredMandatory.length > 0) {
      saveQuests(updated);
      set({ quests: updated });
    }
    
    return expiredMandatory;
  },
}));
