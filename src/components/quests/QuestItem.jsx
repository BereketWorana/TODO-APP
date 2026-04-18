import React, { useState } from 'react'
import { CheckCircle2, Circle, Edit2, Trash2, ChevronDown, ChevronRight, Check, X, GripVertical, ListPlus, MinusCircle } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CATEGORIES, PRIORITY_COLORS } from '../../lib/constants'
import { useUIStore } from '../../store/useUIStore'

export default function QuestItem({ 
  todo, 
  onToggle, 
  onDelete, 
  onUpdate, 
  onAddSubtask, 
  onToggleSubtask, 
  onDeleteSubtask 
}) {
  const { expandedQuest, setExpandedQuest } = useUIStore()
  const isExpanded = expandedQuest === todo.id
  
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.title)
  const [addingSubtask, setAddingSubtask] = useState(false)
  const [newSubtask, setNewSubtask] = useState("")

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const pColor = PRIORITY_COLORS[todo.priority] || PRIORITY_COLORS.medium
  const cat = CATEGORIES.find(c => c.key === todo.category) || CATEGORIES[4]
  const questSubtasks = todo.subtasks || []
  const completedSubtasks = questSubtasks.filter(s => s.is_completed).length

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate({ id: todo.id, title: editText.trim() })
      setEditing(false)
    }
  }

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onAddSubtask({ todoId: todo.id, title: newSubtask.trim() })
      setNewSubtask("")
      setAddingSubtask(false)
    }
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div 
        className={`quest-item ${todo.is_completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{ borderLeft: `4px solid ${pColor}` }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
          
          <button {...listeners} className="btn-icon" style={{ cursor: "grab" }}>
            <GripVertical size={18} />
          </button>
          
          <button onClick={() => onToggle({ todo })} className="btn-icon" style={{ padding: 0 }}>
            {todo.is_completed ? <CheckCircle2 size={24} className="text-acc" /> : <Circle size={24} />}
          </button>
          
          {editing ? (
            <input 
              className="input-base"
              style={{ flex: 1, padding: "8px 14px" }}
              value={editText} 
              onChange={e => setEditText(e.target.value)} 
              onKeyDown={e => { if (e.key === "Enter") handleSaveEdit(); if (e.key === "Escape") setEditing(false) }} 
              autoFocus 
            />
          ) : (
            <span 
              onDoubleClick={() => setEditing(true)} 
              style={{ flex: 1, fontSize: 15, fontWeight: 500, color: todo.is_completed ? "var(--muted)" : "var(--text)", textDecoration: todo.is_completed ? "line-through" : "none", cursor: "text" }}
            >
              {todo.title}
            </span>
          )}
          
          {questSubtasks.length > 0 && (
            <span style={{ fontSize: 12, color: "var(--text)", background: "var(--bg3)", padding: "4px 10px", borderRadius: 20, flexShrink: 0, fontWeight: 600, border: "1px solid var(--bdr)" }}>
              {completedSubtasks}/{questSubtasks.length}
            </span>
          )}
          
          <span className="tag" style={{ color: cat.color, background: "var(--glass-bg)", border: `1px solid ${cat.color}40` }}>
            {cat.label}
          </span>
          
          <span style={{ fontSize: 13, fontWeight: 700, color: pColor, flexShrink: 0, background: `${pColor}20`, padding: "5px 10px", borderRadius: 8 }}>
            +{todo.xp_reward || 50}xp
          </span>
          
          <button onClick={() => setExpandedQuest(todo.id)} className="btn-icon">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          
          {editing ? (
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={handleSaveEdit} className="btn-icon success"><Check size={16} /></button>
              <button onClick={() => setEditing(false)} className="btn-icon danger"><X size={16} /></button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setEditing(true)} className="btn-icon"><Edit2 size={16} /></button>
              <button onClick={() => onDelete(todo.id)} className="btn-icon danger"><Trash2 size={16} /></button>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div style={{ padding: "0 20px 18px 90px", borderTop: "1px solid var(--bdr)", background: "var(--glass-bg)" }}>
            
            {questSubtasks.map(subtask => (
              <div key={subtask.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                <button onClick={() => onToggleSubtask({ subtaskId: subtask.id, isCompleted: subtask.is_completed })} className="btn-icon" style={{ padding: 0 }}>
                  {subtask.is_completed ? <CheckCircle2 size={18} className="text-acc" /> : <Circle size={18} />}
                </button>
                <span style={{ flex: 1, fontSize: 14, color: subtask.is_completed ? "var(--muted)" : "var(--text)", textDecoration: subtask.is_completed ? "line-through" : "none" }}>
                  {subtask.title}
                </span>
                <button onClick={() => onDeleteSubtask(subtask.id)} className="btn-icon danger">
                  <MinusCircle size={16} />
                </button>
              </div>
            ))}
            
            {addingSubtask ? (
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input
                  className="input-base"
                  style={{ flex: 1, padding: "10px 14px", fontSize: 14 }}
                  value={newSubtask}
                  onChange={e => setNewSubtask(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleAddSubtask(); if (e.key === "Escape") setAddingSubtask(false) }}
                  placeholder="Subtask objective..."
                  autoFocus
                />
                <button onClick={handleAddSubtask} className="btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>Add</button>
                <button onClick={() => setAddingSubtask(false)} className="btn-secondary">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setAddingSubtask(true)} className="btn-icon" style={{ marginTop: 6, width: "auto" }}>
                <ListPlus size={16} style={{ marginRight: 8 }} />
                <span className="font-semibold text-sm">Add Subtask</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
