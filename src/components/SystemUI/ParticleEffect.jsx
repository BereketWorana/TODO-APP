// ⚡ THE SYSTEM — Particle Effect Component
// Wrapper that triggers particle burst on demand

import React, { useRef } from 'react';
import { useParticleBurst } from '../../hooks/useParticleBurst';

export function ParticleEffect({
  active,
  x,
  y,
  count = 50,
  colors = ['#3b82f6', '#7c3aed', '#f59e0b'],
  speed = 5,
}) {
  if (!active) return null;
  
  useParticleBurst({ x, y, count, colors, speed });
  return null;
}
