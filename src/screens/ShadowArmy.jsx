// ⚡ THE SYSTEM — Shadow Army Screen

import React from 'react';
import { useHunterStore } from '../store/hunterStore';
import { SystemWindow } from '../components/SystemUI/SystemWindow';
import { GlowText } from '../components/SystemUI/GlowText';
import { RANK_COLORS } from '../types/index';

export function ShadowArmyScreen() {
  const { hunter } = useHunterStore();
  
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
      {/* ARISE Header */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <GlowText color="var(--system-gold)" size="48px" weight={900}>
          ARISE.
        </GlowText>
      </div>
      
      {/* Shadow Grid */}
      {hunter.shadowArmy.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {hunter.shadowArmy.map(shadow => (
            <SystemWindow key={shadow.id} corners cornerColor={RANK_COLORS[shadow.rank]}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: RANK_COLORS[shadow.rank], textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {shadow.rank} Rank
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {shadow.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Power: {shadow.power}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Raised: {new Date(shadow.raisedAt).toLocaleDateString()}
                </div>
              </div>
            </SystemWindow>
          ))}
        </div>
      ) : (
        <SystemWindow title="NO SHADOWS" corners>
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>The shadow army awaits.</div>
            <div style={{ fontSize: '12px', fontStyle: 'italic' }}>Complete quests and summon shadows to build your army.</div>
          </div>
        </SystemWindow>
      )}
    </div>
  );
}
