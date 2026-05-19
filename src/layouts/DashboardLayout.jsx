// ⚡ THE SYSTEM — Dashboard Layout
// Main layout wrapper with responsive sidebar and content area

import React from 'react';
import { useUIStore } from '../store/uiStore';
import { SidebarNav } from './SidebarNav';
import { NotificationContainer } from '../components/NotificationContainer';

export function DashboardLayout({ children }) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  
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
        {children}
      </main>
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
}
