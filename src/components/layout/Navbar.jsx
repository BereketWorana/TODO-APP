import React from 'react'
import { Shield, Sun, Moon, Zap } from 'lucide-react'
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
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", background: "var(--navbar-bg)", borderBottom: "2px solid rgba(167, 139, 250, 0.2)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)", boxShadow: "0 0 30px rgba(167, 139, 250, 0.1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, fontSize: 22, letterSpacing: "0.02em" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Shield size={28} style={{ color: "var(--acc)", filter: "drop-shadow(0 0 12px var(--acc-glow))" }} />
          <Zap size={16} style={{ position: "absolute", color: "var(--neon-gold)", right: -8, bottom: -4, filter: "drop-shadow(0 0 6px var(--neon-gold-glow))" }} />
        </div>
        <div>
          <span style={{ color: "var(--acc)", textShadow: "0 0 20px var(--acc-glow)", marginRight: 8 }}>THE</span>
          <span style={{ color: "var(--text)", fontWeight: 700, textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>SYSTEM</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {profile && rank && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(167, 139, 250, 0.05)", border: "1px solid rgba(167, 139, 250, 0.3)", borderRadius: 10, padding: "8px 16px", boxShadow: "0 0 15px rgba(167, 139, 250, 0.1)", backdropFilter: "blur(10px)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: rank.color, boxShadow: `0 0 12px ${rank.glow}` }} />
            <span style={{ fontSize: 14, color: rank.color, fontWeight: 700, letterSpacing: "0.05em", textShadow: `0 0 8px ${rank.glow}` }}>RANK {rank.name}</span>
            <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 600 }}>Lv.{profile.level || 1}</span>
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
