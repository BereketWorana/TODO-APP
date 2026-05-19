// ⚡ THE SYSTEM — Dashboard Screen
// Main dashboard with stats and quick access

import React from 'react';
import { useHunterStore } from '../store/hunterStore';
import { useQuestStore } from '../store/questStore';
import { Zap, Target, Flame, Trophy } from 'lucide-react';
import { SystemWindow } from '../components/SystemUI/SystemWindow';

export function DashboardScreen() {
  const { hunter } = useHunterStore();
  const { quests } = useQuestStore();
  
  const activeQuests = quests.filter(q => q.status === 'active').length;
  const completedToday = quests.filter(q => q.status === 'completed' && q.isDaily).length;
  const xpPercent = (hunter.currentXP / hunter.xpToNextLevel) * 100;
  
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Level Card */}
        <SystemWindow title="CURRENT LEVEL">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--system-blue)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              {hunter.level}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {hunter.rank} Rank
            </div>
            <div style={{ height: '6px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: xpPercent + '%', background: 'linear-gradient(90deg, var(--system-blue), var(--system-purple))', transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              {hunter.currentXP} / {hunter.xpToNextLevel} XP
            </div>
          </div>
        </SystemWindow>
        
        {/* Active Quests Card */}
        <SystemWindow title="ACTIVE QUESTS">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <Target size={32} color="var(--system-cyan)" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {activeQuests}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Available
              </div>
            </div>
          </div>
        </SystemWindow>
        
        {/* Daily Completed Card */}
        <SystemWindow title="DAILY COMPLETED">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <Trophy size={32} color="var(--system-gold)" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {completedToday}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Today
              </div>
            </div>
          </div>
        </SystemWindow>
        
        {/* Streak Card */}
        <SystemWindow title="STREAK">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <Flame size={32} color="var(--system-red)" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {hunter.streakDays}d
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Days
              </div>
            </div>
          </div>
        </SystemWindow>
      </div>
      
      {/* Stats Grid */}
      <SystemWindow title="HUNTER STATS" corners>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          {Object.entries(hunter.stats).map(([stat, value]) => (
            <div key={stat} style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--system-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                {stat}
              </div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </SystemWindow>
    </div>
  );
}
