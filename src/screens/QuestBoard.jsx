// ⚡ THE SYSTEM — Quest Board Screen

import React, { useState } from 'react';
import { useQuestStore } from '../store/questStore';
import { useUIStore } from '../store/uiStore';
import { useHunterStore } from '../store/hunterStore';
import { SystemWindow } from '../components/SystemUI/SystemWindow';
import { RANK_COLORS } from '../types/index';

function useQuestService() {
  const { addXP, completeQuest, failMandatoryQuest } = useHunterStore();
  const { updateQuestStatus } = useQuestStore();
  const { setLevelUpData, openModal, pushNotification } = useUIStore();
  
  const completeQuestWithRewards = (questId) => {
    const quest = useQuestStore.getState().quests.find(q => q.id === questId);
    if (!quest) return;
    
    updateQuestStatus(questId, 'completed');
    const { didLevelUp, didRankUp, newLevel, newRank } = addXP(quest.xpReward);
    completeQuest();
    
    pushNotification({
      title: 'QUEST COMPLETED',
      message: `${quest.title} completed! +${quest.xpReward} XP`,
      type: 'success',
      duration: 3000,
    });
    
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
  
  return { completeQuestWithRewards };
}

export function QuestBoardScreen() {
  const { quests } = useQuestStore();
  const { openModal } = useUIStore();
  const { completeQuestWithRewards } = useQuestService();
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filtered = quests.filter(q => statusFilter === 'all' ? true : q.status === statusFilter);
  
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'active', 'completed', 'failed'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              padding: '8px 16px',
              background: statusFilter === status ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: `1px solid ${statusFilter === status ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.2)'}`,
              borderRadius: '6px',
              color: statusFilter === status ? 'var(--system-blue)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map(quest => (
          <SystemWindow key={quest.id} title={quest.title} corners>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {quest.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', padding: '4px 8px', background: `${RANK_COLORS[quest.rank]}30`, border: `1px solid ${RANK_COLORS[quest.rank]}`, borderRadius: '4px', color: RANK_COLORS[quest.rank], fontWeight: 600 }}>
                    {quest.rank} Rank
                  </span>
                  <span style={{ fontSize: '11px', padding: '4px 8px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '4px', color: 'var(--system-blue)', fontWeight: 600 }}>
                    +{quest.xpReward} XP
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (quest.status === 'active') {
                    completeQuestWithRewards(quest.id);
                  }
                }}
                style={{
                  padding: '8px 16px',
                  background: quest.status === 'active' ? 'linear-gradient(135deg, var(--system-blue), var(--system-purple))' : 'rgba(59, 130, 246, 0.1)',
                  color: quest.status === 'active' ? '#fff' : 'var(--text-muted)',
                  border: `1px solid ${quest.status === 'active' ? 'transparent' : 'rgba(59, 130, 246, 0.2)'}`,
                  borderRadius: '6px',
                  cursor: quest.status === 'active' ? 'pointer' : 'default',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {quest.status === 'completed' ? 'Done' : quest.status === 'active' ? 'Complete' : 'Failed'}
              </button>
            </div>
          </SystemWindow>
        ))}
      </div>
      
      <button
        onClick={() => openModal('addQuest')}
        style={{
          marginTop: '24px',
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, var(--system-blue), var(--system-purple))',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        + REGISTER NEW QUEST
      </button>
    </div>
  );
}
