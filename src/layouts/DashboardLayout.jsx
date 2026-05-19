// ⚡ THE SYSTEM — Dashboard Layout
// Main layout wrapper with responsive sidebar and content area

import React from 'react';
import { useUIStore } from '../store/uiStore';
import { SidebarNav } from './SidebarNav';
import { NotificationContainer } from '../components/NotificationContainer';

// Screens
import { DashboardScreen } from '../screens/Dashboard';
import { QuestBoardScreen } from '../screens/QuestBoard';
import { HunterInfoScreen } from '../screens/HunterInfo';
import { ShadowArmyScreen } from '../screens/ShadowArmy';
import { AchievementsScreen } from '../screens/Achievements';
import { SettingsScreen } from '../screens/Settings';

export function DashboardLayout({ children }) {
  const { sidebarCollapsed, currentScreen } = useUIStore();
  
  // Render the correct screen based on currentScreen state
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
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-void)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.95) 100%)',
          borderRight: '1px solid rgba(59, 130, 246, 0.2)',
          transition: 'width 0.3s ease',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <SidebarNav collapsed={sidebarCollapsed} />
      </aside>
      
      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {renderScreen()}
      </main>
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
}
