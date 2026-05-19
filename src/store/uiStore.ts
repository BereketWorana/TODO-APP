// ⚡ THE SYSTEM — UI State Management (Modal & Notification System)

import { create } from 'zustand';

export type ModalType = 'welcome' | 'addQuest' | 'levelUp' | 'settingsConfirm' | null;
export type ScreenType = 'dashboard' | 'quests' | 'hunter' | 'shadows' | 'achievements' | 'settings';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}

export interface LevelUpData {
  oldLevel: number;
  newLevel: number;
  oldRank: string;
  newRank: string;
}

interface UIState {
  currentScreen: ScreenType;
  activeModal: ModalType;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  levelUpData: LevelUpData | null;
  
  setScreen: (screen: ScreenType) => void;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  pushNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setLevelUpData: (data: LevelUpData | null) => void;
  clearAllNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentScreen: 'dashboard',
  activeModal: null,
  sidebarCollapsed: false,
  notifications: [],
  levelUpData: null,
  
  setScreen: (screen) => set({ currentScreen: screen }),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  
  pushNotification: (notif) => {
    const id = crypto.randomUUID();
    set(s => ({
      notifications: [...s.notifications, { ...notif, id }],
    }));
    // Auto-remove after duration
    setTimeout(() => {
      set(s => ({
        notifications: s.notifications.filter(n => n.id !== id),
      }));
    }, notif.duration || 3000);
  },
  
  removeNotification: (id) => {
    set(s => ({
      notifications: s.notifications.filter(n => n.id !== id),
    }));
  },
  
  setLevelUpData: (data) => set({ levelUpData: data }),
  
  clearAllNotifications: () => {
    set({ notifications: [] });
  },
}));
