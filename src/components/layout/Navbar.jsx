import React from 'react'
import { Shield, Sun, Moon } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { toastConfig } from '../../lib/toastConfig'
import { useUIStore } from '../../store/useUIStore'
import { getRank } from '../../lib/constants'

export default function Navbar({ profile }) {
  const { dark, toggleDark } = useUIStore()
  const rank = profile ? getRank(profile.xp || 0) : null

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) toastConfig.error("Failed to log out")
    else toastConfig.logout("Logged out of the System")
  }

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", background: "var(--navbar-bg)", borderBottom: "1px solid var(--bdr)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, fontSize: 22, letterSpacing: "0.02em" }}>
        <Shield size={28} className="text-acc" style={{ filter: "drop-shadow(0 0 8px var(--acc-glow))" }} />
        <span className="text-acc" style={{ textShadow: "0 0 20px var(--acc-glow)" }}>THE</span>
        <span style={{ color: "var(--text)", fontWeight: 700 }}>SYSTEM</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {profile && rank && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg3)", border: "1px solid var(--bdr)", borderRadius: 10, padding: "8px 16px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: rank.color, boxShadow: `0 0 12px ${rank.glow}` }} />
            <span style={{ fontSize: 14, color: rank.color, fontWeight: 700, letterSpacing: "0.05em" }}>RANK {rank.name}</span>
            <span className="text-muted font-semibold text-xs">Lv.{profile.level || 1}</span>
          </div>
        )}
        <button onClick={toggleDark} className="btn-secondary" style={{ padding: "10px", display: "flex" }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={handleLogout} className="btn-danger-outline">
          <Shield size={16} />
          <span>EXIT SYSTEM</span>
        </button>
      </div>
    </nav>
  )
}
