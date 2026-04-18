export const RANKS = [
  { name: 'E', min: 0,     max: 500,   color: '#94a3b8', glow: 'rgba(148,163,184,0.4)' },
  { name: 'D', min: 500,   max: 1500,  color: '#10b981', glow: 'rgba(16,185,129,0.4)'   },
  { name: 'C', min: 1500,  max: 3000,  color: '#3b82f6', glow: 'rgba(59,130,246,0.4)'  },
  { name: 'B', min: 3000,  max: 6000,  color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)'  },
  { name: 'A', min: 6000,  max: 10000, color: '#f59e0b', glow: 'rgba(245,158,11,0.4)'  },
  { name: 'S', min: 10000, max: 99999, color: '#ef4444', glow: 'rgba(239,68,68,0.5)'  },
]

export const CATEGORIES = [
  { key: 'daily',   label: 'Daily Quest',  color: 'var(--cat-daily)' },
  { key: 'main',    label: 'Main Quest',   color: 'var(--cat-main)' },
  { key: 'study',   label: 'Intelligence', color: 'var(--cat-study)' },
  { key: 'fitness', label: 'Strength',     color: 'var(--cat-fitness)' },
  { key: 'side',    label: 'Side Quest',   color: 'var(--cat-side)' },
]

export const XP_MAP = { high: 100, medium: 50, low: 20 }
export const PRIORITY_COLORS = { 
  high: 'var(--priority-high)', 
  medium: 'var(--priority-medium)', 
  low: 'var(--priority-low)' 
}

export function getRank(xp) {
  return RANKS.slice().reverse().find(r => xp >= r.min) || RANKS[0]
}

export function getNextRank(xp) {
  return RANKS.find(r => xp < r.max) || RANKS[RANKS.length - 1]
}
