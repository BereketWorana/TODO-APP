// ⚡ THE SYSTEM — Quest Service
// Handles quest completion with XP gains, level ups, and animations

import { useHunterStore } from '../store/hunterStore';
import { useQuestStore } from '../store/questStore';
import { useUIStore } from '../store/uiStore';
import { Quest } from '../types/index';

export function useQuestService() {
  const { addXP, completeQuest, failMandatoryQuest } = useHunterStore();
  const { updateQuestStatus } = useQuestStore();
  const { setLevelUpData, openModal, pushNotification } = useUIStore();
  
  const completeQuestWithRewards = (questId: string) => {
    const quest = useQuestStore.getState().quests.find(q => q.id === questId);
    if (!quest) return;
    
    // Update quest status
    updateQuestStatus(questId, 'completed');
    
    // Add XP and get level up info
    const { didLevelUp, didRankUp, newLevel, newRank } = addXP(quest.xpReward);
    
    // Update hunter stats
    completeQuest();
    
    // Show notification
    pushNotification({
      title: 'QUEST COMPLETED',
      message: `${quest.title} completed! +${quest.xpReward} XP`,
      type: 'success',
      duration: 3000,
    });
    
    // If level up, show modal
    if (didLevelUp) {
      const currentHunter = useHunterStore.getState().hunter;
      setLevelUpData({
        oldLevel: currentHunter.level - 1,
        newLevel: currentHunter.level,
        oldRank: currentHunter.rank,
        newRank: newRank,
      });
      openModal('levelUp');
    }
  };
  
  const failQuestWithPenalty = (questId: string) => {
    const quest = useQuestStore.getState().quests.find(q => q.id === questId);
    if (!quest) return;
    
    // Only apply penalty if mandatory
    if (quest.isMandatory) {
      failMandatoryQuest();
      
      pushNotification({
        title: 'QUEST FAILED',
        message: 'Mandatory quest failed. Stat penalty applied and streak broken.',
        type: 'error',
        duration: 4000,
      });
    }
    
    updateQuestStatus(questId, 'failed');
  };
  
  return { completeQuestWithRewards, failQuestWithPenalty };
}
