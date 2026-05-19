// ⚡ THE SYSTEM — localStorage Persistence Layer

import { Hunter, Quest, Rank, calculateRank, calculateTitle, calculateXPToNextLevel } from '../types/index';

const KEYS = {
  HUNTER: 'system_hunter',
  QUESTS: 'system_quests',
  LAST_ACTIVE: 'system_last_active',
  INITIALIZED: 'system_initialized',
};

// ─── Hunter ────────────────────────────────

export function getHunter(): Hunter | null {
  try {
    const raw = localStorage.getItem(KEYS.HUNTER);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Corrupted localStorage (hunter):', e);
    return null;
  }
}

export function saveHunter(hunter: Hunter): void {
  try {
    localStorage.setItem(KEYS.HUNTER, JSON.stringify(hunter));
  } catch (e) {
    console.error('Failed to save hunter:', e);
  }
}

export function createDefaultHunter(): Hunter {
  return {
    id: crypto.randomUUID(),
    name: 'Sung Jin-Woo',
    title: 'Weakest Hunter of All Mankind',
    level: 1,
    rank: 'E',
    currentXP: 0,
    xpToNextLevel: 150,
    totalXP: 0,
    stats: { STR: 10, AGI: 10, INT: 10, VIT: 10, PER: 10, SEN: 10 },
    shadowArmy: [],
    achievements: [],
    streakDays: 0,
    questsCompleted: 0,
    dailyQuestsCompleted: 0,
    createdAt: new Date().toISOString(),
  };
}

export function updateHunterLevel(hunter: Hunter, xpGained: number): { hunter: Hunter; didLevelUp: boolean; didRankUp: boolean } {
  let { level, currentXP, xpToNextLevel, totalXP } = hunter;
  const oldRank = hunter.rank;
  
  currentXP += xpGained;
  totalXP += xpGained;
  
  let didLevelUp = false;
  let didRankUp = false;
  
  while (currentXP >= xpToNextLevel && level < 100) {
    currentXP -= xpToNextLevel;
    level++;
    xpToNextLevel = calculateXPToNextLevel(level);
    didLevelUp = true;
  }
  
  // Cap at level 100
  if (level >= 100) {
    level = 100;
    currentXP = 0;
    xpToNextLevel = 0;
  }
  
  const newRank = calculateRank(level);
  if (newRank !== oldRank) didRankUp = true;
  
  const updated: Hunter = {
    ...hunter,
    level,
    currentXP,
    xpToNextLevel,
    totalXP,
    rank: newRank,
    title: calculateTitle(newRank),
  };
  
  return { hunter: updated, didLevelUp, didRankUp };
}

export function applyPenalty(hunter: Hunter): Hunter {
  // Find highest stat and reduce by 2
  const stats = { ...hunter.stats };
  const entries = Object.entries(stats) as [keyof typeof stats, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const highestStat = entries[0][0];
  stats[highestStat] = Math.max(0, stats[highestStat] - 2);
  
  // Lose 10% of current level's XP (can't de-level)
  const xpLoss = Math.floor(hunter.currentXP * 0.1);
  
  return {
    ...hunter,
    stats,
    currentXP: Math.max(0, hunter.currentXP - xpLoss),
    streakDays: 0, // Streak broken on failure
  };
}

// ─── Quests ────────────────────────────────

export function getQuests(): Quest[] {
  try {
    const raw = localStorage.getItem(KEYS.QUESTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Corrupted localStorage (quests):', e);
    return [];
  }
}

export function saveQuests(quests: Quest[]): void {
  try {
    localStorage.setItem(KEYS.QUESTS, JSON.stringify(quests));
  } catch (e) {
    console.error('Failed to save quests:', e);
  }
}

export function createDefaultQuests(): Quest[] {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  return [
    {
      id: crypto.randomUUID(),
      title: 'Begin Daily Training',
      description: 'Complete the basic training regimen to build your foundation.',
      rank: 'E',
      category: 'Physical',
      xpReward: 50,
      statBoost: { stat: 'STR', amount: 1 },
      status: 'active',
      priority: 'medium',
      dueDate: today,
      createdAt: now.toISOString(),
      completedAt: null,
      isDaily: true,
      isMandatory: true,
    },
    {
      id: crypto.randomUUID(),
      title: 'Study System Mechanics',
      description: 'Learn how THE SYSTEM operates and understand its rules.',
      rank: 'D',
      category: 'Learning',
      xpReward: 100,
      statBoost: { stat: 'INT', amount: 1 },
      status: 'active',
      priority: 'low',
      dueDate: null,
      createdAt: now.toISOString(),
      completedAt: null,
      isDaily: false,
      isMandatory: false,
    },
    {
      id: crypto.randomUUID(),
      title: 'Complete the Double Dungeon',
      description: 'Survive the impossible dungeon. This is how legends are born.',
      rank: 'S',
      category: 'Work',
      xpReward: 1500,
      statBoost: { stat: 'STR', amount: 2 },
      status: 'active',
      priority: 'urgent',
      dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: now.toISOString(),
      completedAt: null,
      isDaily: false,
      isMandatory: false,
    },
    {
      id: crypto.randomUUID(),
      title: '10 Push-ups, 10 Sit-ups, 10 Squats, 10km Run',
      description: 'The legendary daily workout. Every day without fail.',
      rank: 'E',
      category: 'Health',
      xpReward: 50,
      statBoost: { stat: 'VIT', amount: 1 },
      status: 'active',
      priority: 'high',
      dueDate: today,
      createdAt: now.toISOString(),
      completedAt: null,
      isDaily: true,
      isMandatory: true,
    },
  ];
}

// ─── Initialization ────────────────────────

export function initializeSystem(): { hunter: Hunter; quests: Quest[]; isFirstTime: boolean } {
  try {
    const initialized = localStorage.getItem(KEYS.INITIALIZED);
    
    if (!initialized) {
      const hunter = createDefaultHunter();
      const quests = createDefaultQuests();
      saveHunter(hunter);
      saveQuests(quests);
      localStorage.setItem(KEYS.INITIALIZED, 'true');
      localStorage.setItem(KEYS.LAST_ACTIVE, new Date().toDateString());
      return { hunter, quests, isFirstTime: true };
    }
    
    const hunter = getHunter()!;
    const quests = getQuests();
    return { hunter, quests, isFirstTime: false };
  } catch (e) {
    console.error('Failed to initialize system:', e);
    return { hunter: createDefaultHunter(), quests: createDefaultQuests(), isFirstTime: true };
  }
}

export function checkDailyReset(): boolean {
  try {
    const lastActive = localStorage.getItem(KEYS.LAST_ACTIVE);
    const today = new Date().toDateString();
    
    if (lastActive !== today) {
      localStorage.setItem(KEYS.LAST_ACTIVE, today);
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to check daily reset:', e);
    return false;
  }
}

export function resetSystemData(): void {
  try {
    localStorage.removeItem(KEYS.HUNTER);
    localStorage.removeItem(KEYS.QUESTS);
    localStorage.removeItem(KEYS.LAST_ACTIVE);
    localStorage.removeItem(KEYS.INITIALIZED);
  } catch (e) {
    console.error('Failed to reset system data:', e);
  }
}
