import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { CATEGORIES } from '../../lib/constants'

export default function QuestForm({ onAdd }) {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState("medium")
  const [category, setCategory] = useState("side")

  const handleSubmit = () => {
    if (!input.trim()) return
    onAdd({ title: input.trim(), priority, category })
    setInput("")
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="text-acc font-bold" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>⚔ Register New Quest</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        <input 
          className="input-base" 
          style={{ flex: 1 }}
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === "Enter" && handleSubmit()} 
          placeholder="Enter quest objective..." 
        />
        <button onClick={handleSubmit} className="btn-primary">
          <Plus size={20} /><span>ADD QUEST</span>
        </button>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <select className="input-base" style={{ flex: 1, cursor: "pointer", padding: "12px 14px", fontSize: 14 }} value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        <select className="input-base" style={{ flex: 1, cursor: "pointer", padding: "12px 14px", fontSize: 14 }} value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="high">🔥 High Priority (+100xp)</option>
          <option value="medium">⚡ Medium Priority (+50xp)</option>
          <option value="low">✨ Low Priority (+20xp)</option>
        </select>
      </div>
    </div>
  )
}
