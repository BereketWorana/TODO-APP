// ⚡ THE SYSTEM — Glow Text Component
// Text with breathing glow animation

import React from 'react';

export function GlowText({
  children,
  color = 'var(--system-blue)',
  size = '16px',
  animate = true,
  weight = 700,
  className = '',
}) {
  return (
    <span
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        animation: animate ? 'breathe-glow 2s ease-in-out infinite' : undefined,
      }}
      className={className}
    >
      {children}
    </span>
  );
}
