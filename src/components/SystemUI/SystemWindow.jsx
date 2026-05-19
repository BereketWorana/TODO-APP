// ⚡ THE SYSTEM — System Window Component
// Glass morphism panel with optional corner accents

import React from 'react';
import { CornerAccents } from './CornerAccents';

export function SystemWindow({
  children,
  corners = false,
  cornerColor = 'var(--system-blue)',
  title,
  className = '',
}) {
  return (
    <div
      className={`glass-panel ${className}`}
      style={{
        position: 'relative',
        borderRadius: corners ? '8px' : '12px',
      }}
    >
      {title && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 700,
            color: cornerColor,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {title}
        </div>
      )}
      
      <div style={{ padding: '20px' }}>
        {children}
      </div>
      
      {corners && <CornerAccents size={16} color={cornerColor} />}
    </div>
  );
}
