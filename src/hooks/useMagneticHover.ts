// ⚡ THE SYSTEM — Magnetic Hover Hook
// Card cursor tracking + 3D tilt effect

import { useRef, useEffect } from 'react';

interface UseMagneticHoverProps {
  strength?: number;
  maxTilt?: number;
}

export function useMagneticHover({ strength = 10, maxTilt = 5 }: UseMagneticHoverProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;
    let requestID: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const animate = () => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = (mouseX - centerX) / strength;
      const dy = (mouseY - centerY) / strength;
      
      // Clamp tilt values
      const tiltX = Math.max(-maxTilt, Math.min(maxTilt, dy));
      const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -dx));
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
      
      requestID = requestAnimationFrame(animate);
    };
    
    const handleMouseEnter = () => {
      requestID = requestAnimationFrame(animate);
    };
    
    const handleMouseLeave = () => {
      cancelAnimationFrame(requestID);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestID);
    };
  }, [strength, maxTilt]);
  
  return cardRef;
}
