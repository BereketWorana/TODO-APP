// ⚡ THE SYSTEM — Daily Reset Hook
// Checks for daily reset on mount and tab visibility change

import { useEffect } from 'react';
import { useHunterStore } from '../store/hunterStore';
import { useQuestStore } from '../store/questStore';
import { useUIStore } from '../store/uiStore';

export function useDailyReset() {
  const { checkReset: hunterCheckReset } = useHunterStore();
  const { resetDailyQuests, checkExpiredQuests } = useQuestStore();
  const { pushNotification } = useUIStore();
  
  const performReset = () => {
    const didReset = hunterCheckReset();
    if (didReset) {
      resetDailyQuests();
      const expiredIds = checkExpiredQuests();
      
      pushNotification({
        title: 'SYSTEM RESET',
        message: 'A new day has begun. Daily quests have been refreshed.',
        type: 'info',
        duration: 4000,
      });
      
      if (expiredIds.length > 0) {
        pushNotification({
          title: 'MANDATORY QUEST FAILED',
          message: `${expiredIds.length} quest(s) expired. Penalties applied.`,
          type: 'warning',
          duration: 5000,
        });
      }
    }
  };
  
  useEffect(() => {
    // Check on mount
    performReset();
    
    // Check on visibility change (user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        performReset();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
