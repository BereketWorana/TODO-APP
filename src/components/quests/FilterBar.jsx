import React from 'react'
import { Search } from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'

export default function FilterBar() {
  const { filter, setFilter, search, setSearch } = useUIStore()

  const filters = [
    { key: "all",       label: "All Quests" },
    { key: "active",    label: "Active"     },
    { key: "daily",     label: "Daily"      },
    { key: "main",      label: "Main"       },
    { key: "completed", label: "Cleared"    },
  ]

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
      <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
        <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
        <input 
          className="input-base"
          style={{ width: "100%", padding: "12px 16px 12px 42px" }}
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search quests..." 
        />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {filters.map(f => (
          <button 
            key={f.key} 
            onClick={() => setFilter(f.key)} 
            className={`btn-secondary ${filter === f.key ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
