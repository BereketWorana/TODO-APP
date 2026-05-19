// ⚡ THE SYSTEM — Hunter State Management (Zustand)

import { create } from 'zustand';
import { Hunter, HunterStats, ShadowSoldier, Rank, calculateRank, calculateTitle } from '../types/index';
import { getHunter, saveHunter, updateHunterLevel, applyPenalty, initializeSystem, checkDailyReset } from '../lib/storage';

interface HunterState {
  hunter: Hunter;
  isFirstTime: boolean;
  
  // Actions
  addXP: (amount: number) => { didLevelUp: boolean; didRankUp: boolean; newLevel: number; newRank: Rank };
  addStat: (stat: keyof HunterStats, amount: number) => void;
  addShadowSoldier: (soldier: ShadowSoldier) => void;
  completeQuest: () => void;
  failMandatoryQuest: () => void;
  updateStreak: (completed: boolean) => void;
  setHunterName: (name: string) => void;
  resetHunter: () => void;
  checkReset: () => boolean;
}

export const useHunterStore = create<HunterState>((set, get) => {
  const { hunter, isFirstTime } = initializeSystem();
  
  return {
    hunter,
    isFirstTime,
    
    addXP: (amount) => {
      const { hunter: current } = get();
      const { hunter: updated, didLevelUp, didRankUp } = updateHunterLevel(current, amount);
      saveHunter(updated);
      set({ hunter: updated });
      return { didLevelUp, didRankUp, newLevel: updated.level, newRank: updated.rank };
    },
    
    addStat: (stat, amount) => {
      const { hunter } = get();
      const updated = {
        ...hunter,
        stats: {
          ...hunter.stats,
          [stat]: Math.min(100, hunter.stats[stat] + amount),
        },
      };
      saveHunter(updated);
      set({ hunter: updated });
    },
    
    addShadowSoldier: (soldier) => {
      const { hunter } = get();
      const updated = {
        ...hunter,
        shadowArmy: [...hunter.shadowArmy, soldier],
      };
      saveHunter(updated);
      set({ hunter: updated });
    },
    
    completeQuest: () => {
      const { hunter } = get();
      const updated = {
        ...hunter,
        questsCompleted: hunter.questsCompleted + 1,
        dailyQuestsCompleted: hunter.dailyQuestsCompleted + 1,
      };
      saveHunter(updated);
      set({ hunter: updated });
    },
    
    failMandatoryQuest: () => {
      const { hunter } = get();
      const updated = applyPenalty(hunter);
      saveHunter(updated);
      set({ hunter: updated });
    },
    
    updateStreak: (completed) => {
      const { hunter } = get();
      const updated = {
        ...hunter,
        streakDays: completed ? hunter.streakDays + 1 : 0,
      };
      saveHunter(updated);
      set({ hunter: updated });
    },
    
    setHunterName: (name) => {
      const { hunter } = get();
      const updated = { ...hunter, name };
      saveHunter(updated);
      set({ hunter: updated });
    },
    
    resetHunter: () => {
      const { hunter: newHunter } = initializeSystem();
      set({ hunter: newHunter, isFirstTime: false });
    },
    
    checkReset: () => {
      return checkDailyReset();
    },
  };
});
