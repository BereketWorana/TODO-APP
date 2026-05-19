// ⚡ THE SYSTEM — Notification Container
// Displays notification queue in top-right corner

import React from 'react';
import { useUIStore } from '../store/uiStore';
import { X } from 'lucide-react';

export function NotificationContainer() {
  const { notifications, removeNotification } = useUIStore();
  
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
      }}
    >
      {notifications.map(notif => (
        <div
          key={notif.id}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
            border: `1px solid ${
              notif.type === 'success' ? 'rgba(16, 185, 129, 0.3)' :
              notif.type === 'error' ? 'rgba(220, 38, 38, 0.3)' :
              notif.type === 'warning' ? 'rgba(245, 158, 11, 0.3)' :
              'rgba(59, 130, 246, 0.3)'
            }`,
            borderRadius: '8px',
            padding: '16px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
            animation: 'slide-in-right 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 
                    notif.type === 'success' ? '#10b981' :
                    notif.type === 'error' ? '#dc2626' :
                    notif.type === 'warning' ? '#f59e0b' :
                    'var(--system-blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '4px',
                }}
              >
                {notif.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {notif.message}
              </div>
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
