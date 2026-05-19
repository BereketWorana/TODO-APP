// ⚡ THE SYSTEM — Settings Screen

import React from 'react';
import { useHunterStore } from '../store/hunterStore';
import { useUIStore } from '../store/uiStore';
import { resetSystemData } from '../lib/storage';
import { SystemWindow } from '../components/SystemUI/SystemWindow';

export function SettingsScreen() {
  const { hunter, setHunterName, resetHunter } = useHunterStore();
  const { openModal } = useUIStore();
  const [newName, setNewName] = React.useState(hunter.name);
  
  const handleNameChange = () => {
    if (newName.trim()) {
      setHunterName(newName);
    }
  };
  
  const handleReset = () => {
    openModal('settingsConfirm');
  };
  
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px', maxWidth: '600px' }}>
      {/* Hunter Name */}
      <SystemWindow title="EDIT HUNTER NAME" corners style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
            }}
          />
          <button
            onClick={handleNameChange}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, var(--system-blue), var(--system-purple))',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Save
          </button>
        </div>
      </SystemWindow>
      
      {/* System Info */}
      <SystemWindow title="SYSTEM INFO" corners style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>
              Created
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {new Date(hunter.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>
              Total Play Time
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              ~{Math.floor((Date.now() - new Date(hunter.createdAt).getTime()) / (1000 * 60 * 60))}h
            </div>
          </div>
        </div>
      </SystemWindow>
      
      {/* Danger Zone */}
      <SystemWindow title="DANGER ZONE" corners cornerColor="var(--system-red)">
        <div style={{ padding: '16px', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '6px', marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', color: 'var(--system-red)', fontWeight: 700, marginBottom: '4px' }}>
            WARNING
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Resetting will permanently delete all your hunter data. This action cannot be undone.
          </div>
        </div>
        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.5)',
            color: 'var(--system-red)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Reset All Data
        </button>
      </SystemWindow>
    </div>
  );
}
