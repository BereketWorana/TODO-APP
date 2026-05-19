// ⚡ THE SYSTEM — Level Up Modal

import React, { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import { GlowText } from '../SystemUI/GlowText';

export function LevelUpModal() {
  const { levelUpData, closeModal } = useUIStore();
  useParticleBurst({ x: window.innerWidth / 2, y: window.innerHeight / 2, count: 50, speed: 5 });
  
  useEffect(() => {
    const timer = setTimeout(() => closeModal(), 4000);
    return () => clearTimeout(timer);
  }, [closeModal]);
  
  if (!levelUpData) return null;
  
  return (
    <div
      style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        border: '2px solid rgba(59, 130, 246, 0.5)',
        borderRadius: '12px',
        padding: '64px 48px',
        maxWidth: '600px',
        textAlign: 'center',
        animation: 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        boxShadow: '0 0 60px rgba(59, 130, 246, 0.4)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Rotating Light Beams */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
          animation: 'spin-slow 4s linear infinite',
          pointerEvents: 'none',
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <GlowText size="64px" weight={900} color="var(--system-gold)">
          LEVEL UP
        </GlowText>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '32px 0', fontSize: '36px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
          <div style={{ color: 'var(--text-muted)' }}>{levelUpData.oldLevel}</div>
          <div style={{ color: 'var(--system-blue)' }}>→</div>
          <div style={{ color: 'var(--system-blue)' }}>{levelUpData.newLevel}</div>
        </div>
        
        {levelUpData.oldRank !== levelUpData.newRank && (
          <div style={{ marginBottom: '24px' }}>
            <GlowText size="18px" weight={700} color="var(--system-gold)">
              RANK PROMOTION
            </GlowText>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              {levelUpData.oldRank} → {levelUpData.newRank}
            </div>
          </div>
        )}
        
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '24px', fontStyle: 'italic' }}>
          Click anywhere to dismiss
        </div>
      </div>
    </div>
  );
}
