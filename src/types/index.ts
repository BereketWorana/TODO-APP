// ⚡ THE SYSTEM — Core Type Definitions

export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National';
export type QuestCategory = 'Physical' | 'Learning' | 'Work' | 'Creative' | 'Health' | 'Review' | 'Daily';
export type QuestStatus = 'active' | 'completed' | 'failed' | 'expired';
export type QuestPriority = 'low' | 'medium' | 'high' | 'urgent';
export type StatName = 'STR' | 'AGI' | 'INT' | 'VIT' | 'PER' | 'SEN';

export interface HunterStats {
  STR: number;
  AGI: number;
  INT: number;
  VIT: number;
  PER: number;
  SEN: number;
}

export interface ShadowSoldier {
  id: string;
  name: string;
  power: number;
  rank: Rank;
  questId: string;
  raisedAt: string;
}

export interface Hunter {
  id: string;
  name: string;
  title: string;
  level: number;
  rank: Rank;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  stats: HunterStats;
  shadowArmy: ShadowSoldier[];
  achievements: string[];
  streakDays: number;
  questsCompleted: number;
  dailyQuestsCompleted: number;
  createdAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rank: Rank;
  category: QuestCategory;
  xpReward: number;
  statBoost: { stat: StatName; amount: number };
  status: QuestStatus;
  priority: QuestPriority;
  dueDate: string | null;
  createdAt: string;
  completedAt: string | null;
  isDaily: boolean;
  isMandatory: boolean;
}

// XP & Rank Constants
export const XP_REWARDS: Record<Rank, number> = {
  E: 50,
  D: 100,
  C: 200,
  B: 400,
  A: 750,
  S: 1500,
  National: 3000,
};

export const RANK_THRESHOLDS: { rank: Rank; level: number }[] = [
  { rank: 'E', level: 0 },
  { rank: 'D', level: 10 },
  { rank: 'C', level: 25 },
  { rank: 'B', level: 40 },
  { rank: 'A', level: 60 },
  { rank: 'S', level: 80 },
  { rank: 'National', level: 100 },
];

export const RANK_TITLES: Record<Rank, string> = {
  E: 'Weakest Hunter of All Mankind',
  D: 'Awakened Hunter',
  C: 'Gate Raider',
  B: 'Elite Hunter',
  A: 'Master Hunter',
  S: 'Shadow Commander',
  National: 'The Shadow Monarch',
};

export const RANK_COLORS: Record<Rank, string> = {
  E: '#6b7280',
  D: '#3b82f6',
  C: '#7c3aed',
  B: '#06b6d4',
  A: '#f59e0b',
  S: '#dc2626',
  National: '#fbbf24',
};

export const STAT_COLORS: Record<StatName, string> = {
  STR: '#dc2626',
  AGI: '#06b6d4',
  INT: '#7c3aed',
  VIT: '#10b981',
  PER: '#f59e0b',
  SEN: '#ec4899',
};

export const STAT_CATEGORY_MAP: Record<QuestCategory, StatName> = {
  Physical: 'STR',
  Learning: 'INT',
  Work: 'PER',
  Creative: 'SEN',
  Health: 'VIT',
  Review: 'PER',
  Daily: 'VIT',
};

export function calculateXPToNextLevel(level: number): number {
  return level * 150;
}

export function calculateRank(level: number): Rank {
  const thresholds = [...RANK_THRESHOLDS].reverse();
  for (const t of thresholds) {
    if (level >= t.level) return t.rank;
  }
  return 'E';
}

export function calculateTitle(rank: Rank): string {
  return RANK_TITLES[rank];
}
