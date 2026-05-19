// ⚡ THE SYSTEM — Add Quest Modal

import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useQuestStore } from '../../store/questStore';
import { RANK_THRESHOLDS, XP_REWARDS } from '../../types/index';

const CATEGORIES = ['Physical', 'Learning', 'Work', 'Creative', 'Health', 'Review', 'Daily'];

export function AddQuestModal() {
  const { closeModal } = useUIStore();
  const { addQuest } = useQuestStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rank, setRank] = useState('D');
  const [category, setCategory] = useState('Physical');
  const [isDaily, setIsDaily] = useState(false);
  const [isMandatory, setIsMandatory] = useState(false);
  
  const handleSubmit = () => {
    if (!title.trim()) return;
    
    const quest = {
      id: crypto.randomUUID(),
      title,
      description,
      rank,
      category,
      xpReward: XP_REWARDS[rank],
      statBoost: { stat: 'STR', amount: 1 },
      status: 'active',
      priority: 'medium',
      dueDate: isDaily ? new Date().toISOString().split('T')[0] : null,
      createdAt: new Date().toISOString(),
      completedAt: null,
      isDaily,
      isMandatory,
    };
    
    addQuest(quest);
    closeModal();
  };
  
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        animation: 'scale-in 0.4s ease',
        position: 'relative',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--system-blue)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
        Register New Quest
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Quest Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quest title"
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '10px 12px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quest description"
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '10px 12px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              minHeight: '80px',
              resize: 'none',
            }}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Rank
            </label>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              style={{
                width: '100%',
                marginTop: '6px',
                padding: '10px 12px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '13px',
              }}
            >
              {RANK_THRESHOLDS.map(t => (
                <option key={t.rank} value={t.rank}>
                  {t.rank}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                marginTop: '6px',
                padding: '10px 12px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '13px',
              }}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={isDaily}
              onChange={(e) => setIsDaily(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Daily Quest
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={isMandatory}
              onChange={(e) => setIsMandatory(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Mandatory
          </label>
        </div>
        
        <div style={{ fontSize: '13px', color: 'var(--system-blue)', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', textAlign: 'center', fontWeight: 600 }}>
          +{XP_REWARDS[rank]} XP
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={closeModal}
            style={{
              flex: 1,
              padding: '10px',
              background: 'transparent',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: 'var(--text-secondary)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '10px',
              background: 'linear-gradient(135deg, var(--system-blue), var(--system-purple))',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
