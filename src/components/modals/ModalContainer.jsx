// ⚡ THE SYSTEM — Modal Container Router
// Central modal management

import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { WelcomeModal } from './WelcomeModal';
import { AddQuestModal } from './AddQuestModal';
import { LevelUpModal } from './LevelUpModal';
import { SettingsConfirmModal } from './SettingsConfirmModal';

export function ModalContainer() {
  const { activeModal } = useUIStore();
  
  if (!activeModal) return null;
  
  const renderModal = () => {
    switch (activeModal) {
      case 'welcome':
        return <WelcomeModal />;
      case 'addQuest':
        return <AddQuestModal />;
      case 'levelUp':
        return <LevelUpModal />;
      case 'settingsConfirm':
        return <SettingsConfirmModal />;
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'fade-in 0.3s ease',
        }}
      />
      {/* Modal */}
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
        {renderModal()}
      </div>
    </>
  );
}
