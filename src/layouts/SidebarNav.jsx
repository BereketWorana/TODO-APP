// ⚡ THE SYSTEM — Sidebar Navigation
// Navigation menu with screen switching

import React from 'react';
import { Zap, Compass, User, Skull, Trophy, Settings, Menu } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useHunterStore } from '../store/hunterStore';

export function SidebarNav({ collapsed }) {
  const { currentScreen, setScreen, toggleSidebar } = useUIStore();
  const { hunter } = useHunterStore();
  
  const menuItems = [
    { icon: <Zap size={20} />, label: 'Dashboard', screen: 'dashboard' },
    { icon: <Compass size={20} />, label: 'Quest Board', screen: 'quests' },
    { icon: <User size={20} />, label: 'Hunter Info', screen: 'hunter' },
    { icon: <Skull size={20} />, label: 'Shadow Army', screen: 'shadows' },
    { icon: <Trophy size={20} />, label: 'Achievements', screen: 'achievements' },
    { icon: <Settings size={20} />, label: 'Settings', screen: 'settings' },
  ];
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '16px',
        gap: '8px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        {!collapsed && (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, color: 'var(--system-blue)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            SYSTEM
          </div>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu size={16} />
        </button>
      </div>
      
      {/* Hunter Info Card */}
      {!collapsed && (
        <div
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
            fontSize: '12px',
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{hunter.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Level {hunter.level}</div>
          <div style={{ color: 'var(--system-blue)', fontSize: '11px', marginTop: '4px' }}>{hunter.rank} Rank</div>
        </div>
      )}
      
      {/* Menu Items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map(item => (
          <button
            key={item.screen}
            onClick={() => setScreen(item.screen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 8px',
              background: currentScreen === item.screen ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              border: currentScreen === item.screen ? '1px solid rgba(59, 130, 246, 0.3)' : 'none',
              borderRadius: '8px',
              color: currentScreen === item.screen ? 'var(--system-blue)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => {
              if (currentScreen !== item.screen) {
                e.target.style.background = 'rgba(59, 130, 246, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentScreen !== item.screen) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '20px' }}>
              {item.icon}
            </div>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {/* Footer */}
      {!collapsed && (
        <div
          style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            paddingTop: '16px',
            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
            letterSpacing: '0.5px',
          }}
        >
          RANK {hunter.rank}
        </div>
      )}
    </div>
  );
}
