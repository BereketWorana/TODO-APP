import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import QuestItem from './QuestItem'
import { Shield, GripVertical } from 'lucide-react'

export default function QuestList({ 
  todos, 
  loading, 
  onUpdatePositions,
  questActions
}) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex(t => t.id === active.id)
      const newIndex = todos.findIndex(t => t.id === over.id)
      
      const newTodos = arrayMove(todos, oldIndex, newIndex)
      
      // Send updates to server
      const updates = newTodos.map((todo, index) => ({
        id: todo.id,
        position: index
      }))
      onUpdatePositions(updates)
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[1,2,3].map(i => (
          <div key={i} className="card" style={{ padding: "20px 24px", opacity: 0.3 + i * 0.1 }}>
            <div style={{ height: 14, borderRadius: 7, background: "var(--bdr)", width: `${50 + i * 15}%` }} />
          </div>
        ))}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--bg2)", borderRadius: 20, border: "2px dashed var(--bdr)" }}>
        <Shield size={56} color="var(--bdr)" style={{ margin: "0 auto 20px", opacity: 0.5 }} />
        <p style={{ color: "var(--muted)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No quests found</p>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>The System awaits your next objective, Hunter.</p>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {todos.map(todo => (
            <QuestItem 
              key={todo.id} 
              todo={todo} 
              {...questActions}
            />
          ))}
        </div>
      </SortableContext>
      
      <DragOverlay>
        {activeId ? (
          <div style={{ background: "var(--bg2)", border: "2px solid var(--acc)", borderRadius: 16, padding: "16px 20px", boxShadow: "var(--shadow-lg)", opacity: 0.9 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <GripVertical size={18} color="var(--acc)" />
              <span style={{ color: "var(--text)", fontSize: 15, fontWeight: 500 }}>
                {todos.find(t => t.id === activeId)?.title || "Quest"}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
