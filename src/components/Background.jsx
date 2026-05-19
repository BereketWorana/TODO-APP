// ⚡ THE SYSTEM — Animated Background Component

import React, { useEffect, useRef } from 'react';
import '../styles/globals.css';

export function Background() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at bottom right, var(--system-blue) 0%, var(--bg-abyss) 50%, var(--bg-void) 100%)',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating Orb 1 - Blue */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          top: '-100px',
          left: '-100px',
          animation: 'floating 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      
      {/* Floating Orb 2 - Purple */}
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          bottom: '-150px',
          right: '-50px',
          animation: 'floating 25s ease-in-out infinite',
          animationDelay: '5s',
          willChange: 'transform',
        }}
      />
      
      {/* Floating Orb 3 - Cyan */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          top: '50%',
          right: '-100px',
          animation: 'floating 30s ease-in-out infinite',
          animationDelay: '10s',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
