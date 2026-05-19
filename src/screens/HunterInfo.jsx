// ⚡ THE SYSTEM — Hunter Info Screen

import React from 'react';
import { useHunterStore } from '../store/hunterStore';
import { SystemWindow } from '../components/SystemUI/SystemWindow';
import { RANK_TITLES } from '../types/index';

export function HunterInfoScreen() {
  const { hunter } = useHunterStore();
  
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
      {/* Hunter Profile */}
      <SystemWindow title="HUNTER PROFILE" corners style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Name
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>
              {hunter.name}
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Title
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--system-gold)', marginBottom: '16px' }}>
              {hunter.title}
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Total XP
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {hunter.totalXP.toLocaleString()}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Level / Rank
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>
              {hunter.level} / {hunter.rank}
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Quests Completed
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
              {hunter.questsCompleted}
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Streak Days
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--system-red)' }}>
              {hunter.streakDays}d
            </div>
          </div>
        </div>
      </SystemWindow>
      
      {/* Stats Grid */}
      <SystemWindow title="COMBAT STATS" corners style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {Object.entries(hunter.stats).map(([stat, value]) => (
            <div key={stat} style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: `1px solid rgba(0, 0, 0, 0.2)` }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--system-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                {stat}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {value}
              </div>
              <div style={{ height: '4px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (value / 100) * 100 + '%', background: 'var(--system-blue)' }} />
              </div>
            </div>
          ))}
        </div>
      </SystemWindow>
      
      {/* Shadow Army */}
      <SystemWindow title="SHADOW SOLDIERS" corners>
        <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>Shadows Raised: {hunter.shadowArmy.length}</div>
          {hunter.shadowArmy.length === 0 && (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No shadows have been raised yet. Complete quests to summon shadows.
            </div>
          )}
        </div>
      </SystemWindow>
    </div>
  );
}
