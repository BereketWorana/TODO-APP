// ⚡ THE SYSTEM — Konami Code Easter Egg Hook
// Press: ↑ ↑ ↓ ↓ ← → ← → B A to trigger special effect

import { useEffect, useRef } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function useKonamiCode(onTriggered) {
  const sequenceRef = useRef([]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' 
        ? e.key 
        : e.key.toLowerCase();
      
      sequenceRef.current.push(key);
      
      // Keep only last 10 keys
      if (sequenceRef.current.length > KONAMI_CODE.length) {
        sequenceRef.current.shift();
      }
      
      // Check if sequence matches
      const lastN = sequenceRef.current.slice(-KONAMI_CODE.length);
      if (lastN.join(',') === KONAMI_CODE.join(',')) {
        sequenceRef.current = [];
        onTriggered?.();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTriggered]);
}
