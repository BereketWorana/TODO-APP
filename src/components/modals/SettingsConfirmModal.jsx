// ⚡ THE SYSTEM — Settings Confirm Modal

import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { useHunterStore } from '../../store/hunterStore';
import { resetSystemData } from '../../lib/storage';

export function SettingsConfirmModal() {
  const { closeModal } = useUIStore();
  const { resetHunter } = useHunterStore();
  
  const handleConfirm = () => {
    resetSystemData();
    resetHunter();
    closeModal();
  };
  
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
        border: '2px solid rgba(220, 38, 38, 0.5)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '450px',
        textAlign: 'center',
        animation: 'scale-in 0.4s ease',
        position: 'relative',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--system-red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
        WARNING
      </div>
      
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
        Are you absolutely sure? This will permanently delete all your hunter data, including your level, stats, quests, and shadow army.
      </div>
      
      <div style={{ padding: '16px', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '6px', marginBottom: '24px', fontSize: '12px', color: 'var(--system-red)', fontWeight: 600 }}>
        THIS ACTION CANNOT BE UNDONE
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={closeModal}
          style={{
            flex: 1,
            padding: '12px',
            background: 'transparent',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: 'var(--text-secondary)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          style={{
            flex: 1,
            padding: '12px',
            background: 'rgba(220, 38, 38, 0.2)',
            border: '1px solid rgba(220, 38, 38, 0.5)',
            color: 'var(--system-red)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
