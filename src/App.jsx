import React, { useEffect } from 'react';
import { Background } from './components/Background';
import { DashboardLayout } from './layouts/DashboardLayout';
import { useUIStore } from './store/uiStore';
import { useHunterStore } from './store/hunterStore';
import { useDailyReset } from './hooks/useDailyReset';
import { useKonamiCode } from './hooks/useKonamiCode';
import './styles/globals.css';

// Screens
import { DashboardScreen } from './screens/Dashboard';
import { QuestBoardScreen } from './screens/QuestBoard';
import { HunterInfoScreen } from './screens/HunterInfo';
import { ShadowArmyScreen } from './screens/ShadowArmy';
import { AchievementsScreen } from './screens/Achievements';
import { SettingsScreen } from './screens/Settings';

// Modals
import { ModalContainer } from './components/modals/ModalContainer';

function App() {
  const { currentScreen, openModal } = useUIStore();
  const { addXP } = useHunterStore();
  const { pushNotification } = useUIStore();
  const { isFirstTime } = useHunterStore();
  
  useDailyReset();
  
  // Show welcome modal on first load
  useEffect(() => {
    if (isFirstTime) {
      openModal('welcome');
    }
  }, [isFirstTime, openModal]);
  
  // Konami Code easter egg
  useKonamiCode(() => {
    addXP(1000);
    pushNotification({
      title: 'SECRET UNLOCKED',
      message: '+1000 XP Bonus Gained!',
      type: 'success',
      duration: 5000,
    });
    // Flash gold shimmer
    document.documentElement.style.filter = 'hue-rotate(40deg) saturate(2)';
    setTimeout(() => {
      document.documentElement.style.filter = '';
    }, 10000);
  });
  
  // Screen routing
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'quests':
        return <QuestBoardScreen />;
      case 'hunter':
        return <HunterInfoScreen />;
      case 'shadows':
        return <ShadowArmyScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };
  
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-void)' }}>
      <Background />
      <DashboardLayout>
        {renderScreen()}
      </DashboardLayout>
      <ModalContainer />
    </div>
  );
}

export default App;
