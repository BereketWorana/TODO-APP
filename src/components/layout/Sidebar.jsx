import React from 'react'
import { Target, Trophy, Flame } from 'lucide-react'
import { getRank, getNextRank, RANKS } from '../../lib/constants'

export default function Sidebar({ user, profile, totalQuests, completedQuests }) {
  const rank = profile ? getRank(profile.xp || 0) : RANKS[0]
  const nextRank = profile ? getNextRank(profile.xp || 0) : RANKS[1]
  const xpPct = profile ? Math.min(((profile.xp - rank.min) / (nextRank.max - rank.min)) * 100, 100) : 0

  return (
    <div style={{ width: 290, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hunter Card */}
      <div className="card" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: rank.glow, filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, var(--acc), #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff", boxShadow: "0 0 24px var(--acc-glow)", border: "2px solid var(--acc)" }}>
            {user?.email?.[0]?.toUpperCase() || "H"}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "var(--text)", marginBottom: 4 }}>{profile?.username || "Hunter"}</div>
            <div className="text-muted text-xs">{user?.email}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span className="text-muted font-semibold tag">EXP</span>
          <span style={{ fontSize: 14, color: rank.color, fontWeight: 700 }}>{profile?.xp || 0} / {nextRank.max}</span>
        </div>
        <div style={{ height: 8, background: "var(--bdr)", borderRadius: 99, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ height: "100%", width: xpPct + "%", background: `linear-gradient(90deg, var(--acc), ${rank.color})`, borderRadius: 99, transition: "width 0.5s", boxShadow: `0 0 12px ${rank.glow}` }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Quests",  value: totalQuests, icon: <Target size={16} color="var(--acc)" />         },
            { label: "Cleared", value: completedQuests,    icon: <Trophy size={16} color="var(--success)" />      },
            { label: "Streak",  value: (profile?.streak || 0) + "d", icon: <Flame size={16} color="var(--cat-daily)" /> },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg3)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: "1px solid var(--bdr)" }}>
              <div className="flex-center" style={{ marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>{s.value}</div>
              <div className="text-muted font-semibold" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Ladder */}
      <div className="card">
        <div className="text-muted font-bold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Hunter Ranks</div>
        {RANKS.map(r => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, opacity: (profile?.xp || 0) >= r.min ? 1 : 0.35 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, border: `2px solid ${r.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: r.color, boxShadow: (profile?.xp || 0) >= r.min ? `0 0 16px ${r.glow}` : "none", background: "rgba(0,0,0,0.3)" }}>
              {r.name}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 600 }}>Rank {r.name}</div>
              <div className="text-muted font-medium text-xs">{r.min.toLocaleString()} XP</div>
            </div>
            {rank.name === r.name && <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, boxShadow: `0 0 12px ${r.glow}` }} />}
          </div>
        ))}
      </div>
    </div>
  )
}
