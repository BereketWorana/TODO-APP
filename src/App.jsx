import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { supabase } from './lib/supabaseClient'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import QuestForm from './components/quests/QuestForm'
import FilterBar from './components/quests/FilterBar'
import QuestList from './components/quests/QuestList'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useQuests } from './hooks/useQuests'
import { useProfile } from './hooks/useProfile'
import { useUIStore } from './store/useUIStore'

const queryClient = new QueryClient()

function AppContent() {
  const [user, setUser] = React.useState(null)
  const { filter, search } = useUIStore()

  useEffect(() => {
    // Make sure initial theme matches Zustand store
    document.documentElement.setAttribute('data-theme', useUIStore.getState().dark ? 'dark' : 'light');

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const { data: profile } = useProfile(user?.id)
  const { 
    todos, 
    isLoading, 
    addQuest, 
    toggleQuest, 
    deleteQuest, 
    updateQuest, 
    updatePositions,
    addSubtask, 
    toggleSubtask, 
    deleteSubtask,
    clearCompleted 
  } = useQuests(user?.id, profile)

  const filtered = todos.filter(t => {
    const mf =
      filter === "all"       ? true :
      filter === "active"    ? !t.is_completed :
      filter === "completed" ? t.is_completed :
      filter === "daily"     ? t.category === "daily" :
      filter === "main"      ? t.category === "main" : true
    return mf && t.title.toLowerCase().includes(search.toLowerCase())
  })

  const completed = todos.filter(t => t.is_completed).length

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar profile={profile} />
      <div style={{ display: "flex", maxWidth: 1300, margin: "0 auto", width: "100%", padding: "28px 24px", gap: 28 }}>
        <Sidebar 
          user={user} 
          profile={profile} 
          totalQuests={todos.length} 
          completedQuests={completed} 
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <QuestForm onAdd={(q) => addQuest({ ...q, position: todos.length })} />
          <FilterBar />
          <QuestList 
            todos={filtered} 
            loading={isLoading}
            onUpdatePositions={updatePositions}
            questActions={{
              onToggle: toggleQuest,
              onDelete: deleteQuest,
              onUpdate: updateQuest,
              onAddSubtask: addSubtask,
              onToggleSubtask: toggleSubtask,
              onDeleteSubtask: deleteSubtask
            }}
          />
          {todos.some(t => t.is_completed) && (
            <button 
              onClick={() => clearCompleted(todos.filter(t => t.is_completed).map(t => t.id))} 
              className="btn-secondary danger" 
              style={{ marginTop: 20, width: "100%", borderColor: "var(--danger)", color: "var(--danger)" }}
            >
              CLEAR COMPLETED QUESTS
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
