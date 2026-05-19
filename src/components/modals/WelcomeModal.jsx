// ⚡ THE SYSTEM — Welcome Modal

import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { GlowText } from '../SystemUI/GlowText';

export function WelcomeModal() {
  const { closeModal } = useUIStore();
  
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '48px',
        maxWidth: '500px',
        textAlign: 'center',
        animation: 'scale-in 0.4s ease',
        position: 'relative',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <GlowText size="48px" weight={900} color="var(--system-gold)">
        THE SYSTEM
      </GlowText>
      
      <div style={{ margin: '24px 0 32px' }}>
        <div style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Welcome, <span style={{ color: 'var(--system-blue)', fontWeight: 700 }}>Hunter</span>.
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.6 }}>
          The world is full of gates and dungeons filled with monsters. This system will help you grow stronger, complete quests, and raise your shadow army.
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.6 }}>
          Are you ready?
        </div>
      </div>
      
      <button
        onClick={closeModal}
        style={{
          width: '100%',
          padding: '14px',
          background: 'linear-gradient(135deg, var(--system-blue), var(--system-purple))',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Begin
      </button>
    </div>
  );
}
