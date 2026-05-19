// ⚡ THE SYSTEM — Particle Burst Hook
// Creates 50 particles with GPU-accelerated transforms

import { useEffect, useRef } from 'react';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface UseParticleBurstProps {
  x: number;
  y: number;
  count?: number;
  colors?: string[];
  speed?: number;
}

export function useParticleBurst({ x, y, count = 50, colors = ['#3b82f6', '#7c3aed', '#f59e0b'], speed = 5 }: UseParticleBurstProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>();
  
  useEffect(() => {
    const container = document.body;
    const particles: Particle[] = [];
    
    // Create particles in a document fragment first (performance optimization)
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - speed * 0.5; // Gravity
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const element = document.createElement('div');
      element.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${color};
        box-shadow: 0 0 10px ${color};
        pointer-events: none;
        z-index: 9999;
      `;
      
      fragment.appendChild(element);
      particles.push({ element, x, y, vx, vy, life: 1, color });
    }
    
    container.appendChild(fragment);
    particlesRef.current = particles;
    
    // Animate with requestAnimationFrame
    const animate = () => {
      let hasAlive = false;
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.life -= 0.03;
        
        if (p.life > 0) {
          hasAlive = true;
          p.element.style.transform = `translate(${p.x - x}px, ${p.y - y}px)`;
          p.element.style.opacity = String(p.life);
        }
      });
      
      if (hasAlive) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Cleanup
        particles.forEach(p => p.element.remove());
        particlesRef.current = [];
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      particles.forEach(p => p.element.remove());
    };
  }, [x, y, count, colors, speed]);
  
  return containerRef;
}
