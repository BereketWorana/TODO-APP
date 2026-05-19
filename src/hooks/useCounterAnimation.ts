// ⚡ THE SYSTEM — Counter Animation Hook
// Animates number changes (XP, stats) with requestAnimationFrame

import { useEffect, useRef, useState } from 'react';

interface UseCounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  onComplete?: () => void;
}

export function useCounterAnimation({ from, to, duration = 500, onComplete }: UseCounterAnimationProps) {
  const [value, setValue] = useState(from);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  useEffect(() => {
    startTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * easeOutCubic;
      
      setValue(Math.round(current));
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(to);
        onComplete?.();
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [from, to, duration, onComplete]);
  
  return value;
}
