// ⚡ THE SYSTEM — Achievements Screen

import React from 'react';
import { useHunterStore } from '../store/hunterStore';
import { SystemWindow } from '../components/SystemUI/SystemWindow';
import { Lock, Unlock } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 'first_quest', name: 'First Hunter', description: 'Complete your first quest' },
  { id: 'level_10', name: 'Ascending', description: 'Reach level 10' },
  { id: 'level_50', name: 'Dominant', description: 'Reach level 50' },
  { id: 'shadow_10', name: 'Army Builder', description: 'Raise 10 shadow soldiers' },
  { id: 'streak_30', name: 'Unstoppable', description: 'Maintain a 30-day streak' },
  { id: 'all_stats', name: 'Perfect Balance', description: 'All stats at 50+' },
  { id: 'monster_hunter', name: 'Monster Hunter', description: 'Complete 100 quests' },
  { id: 'shadow_century', name: 'Shadow Century', description: 'Raise 100 shadow soldiers' },
];

export function AchievementsScreen() {
  const { hunter } = useHunterStore();
  
  const unlocked = (ach) => {
    switch (ach.id) {
      case 'first_quest':
        return hunter.questsCompleted >= 1;
      case 'level_10':
        return hunter.level >= 10;
      case 'level_50':
        return hunter.level >= 50;
      case 'shadow_10':
        return hunter.shadowArmy.length >= 10;
      case 'streak_30':
        return hunter.streakDays >= 30;
      case 'all_stats':
        return Object.values(hunter.stats).every(s => s >= 50);
      case 'monster_hunter':
        return hunter.questsCompleted >= 100;
      case 'shadow_century':
        return hunter.shadowArmy.length >= 100;
      default:
        return false;
    }
  };
  
  const unlockedCount = ACHIEVEMENTS.filter(unlocked).length;
  
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
          Progress
        </div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)' }}>
          {unlockedCount} / {ACHIEVEMENTS.length}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {ACHIEVEMENTS.map(ach => {
          const isUnlocked = unlocked(ach);
          return (
            <SystemWindow key={ach.id} corners cornerColor={isUnlocked ? 'var(--system-gold)' : 'var(--system-gray)'}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                  {isUnlocked ? <Unlock size={32} color="var(--system-gold)" /> : <Lock size={32} color="var(--system-gray)" />}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: isUnlocked ? 'var(--system-gold)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {ach.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {ach.description}
                </div>
              </div>
            </SystemWindow>
          );
        })}
      </div>
    </div>
  );
}
