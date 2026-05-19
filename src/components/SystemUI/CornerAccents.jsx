// ⚡ THE SYSTEM — Corner Accents Component
// Animated corner brackets with pulses

import React from 'react';

export function CornerAccents({ size = 20, color = 'var(--system-blue)' }) {
  const cornerStyle = (position) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    border: `2px solid ${color}`,
    ...(position === 'tl' && {
      top: '-2px',
      left: '-2px',
      borderRight: 'none',
      borderBottom: 'none',
    }),
    ...(position === 'tr' && {
      top: '-2px',
      right: '-2px',
      borderLeft: 'none',
      borderBottom: 'none',
    }),
    ...(position === 'bl' && {
      bottom: '-2px',
      left: '-2px',
      borderRight: 'none',
      borderTop: 'none',
    }),
    ...(position === 'br' && {
      bottom: '-2px',
      right: '-2px',
      borderLeft: 'none',
      borderTop: 'none',
    }),
    animation: 'pulse-glow 2s ease-in-out infinite',
  });
  
  return (
    <>
      <div style={cornerStyle('tl')} />
      <div style={cornerStyle('tr')} />
      <div style={cornerStyle('bl')} />
      <div style={cornerStyle('br')} />
    </>
  );
}
