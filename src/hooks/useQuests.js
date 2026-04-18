import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import { toastConfig } from '../lib/toastConfig'
import { XP_MAP, getRank } from '../lib/constants'

export function useQuests(userId, profile) {
  const queryClient = useQueryClient()

  // 1. Fetch Quests & Subtasks
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['quests', userId],
    queryFn: async () => {
      if (!userId) return []
      
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('position', { ascending: true })
        
      if (error) {
        toastConfig.error("Failed to load quests")
        throw error
      }
      
      if (!data || data.length === 0) return []

      const todoIds = data.map(t => t.id)
      const { data: subtasksData } = await supabase
        .from('subtasks')
        .select('*')
        .in('todo_id', todoIds)

      const groupedSubtasks = {}
      if (subtasksData) {
        subtasksData.forEach(s => {
          if (!groupedSubtasks[s.todo_id]) groupedSubtasks[s.todo_id] = []
          groupedSubtasks[s.todo_id].push(s)
        })
      }

      // Attach subtasks to todos for easier rendering
      return data.map(t => ({
        ...t,
        subtasks: groupedSubtasks[t.id] || []
      }))
    },
    enabled: !!userId,
  })

  // 2. Mutations
  const addQuest = useMutation({
    mutationFn: async ({ title, priority, category, position }) => {
      const xp = XP_MAP[priority]
      const { data, error } = await supabase.from('todos').insert([{
        title, priority, is_completed: false, category, xp_reward: xp, user_id: userId, position
      }]).select()
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.quest("Quest registered to the System!")
    },
    onError: () => toastConfig.error("Failed to add quest")
  })

  const toggleQuest = useMutation({
    mutationFn: async ({ todo }) => {
      const nowComplete = !todo.is_completed
      const { error } = await supabase.from("todos").update({ is_completed: nowComplete }).eq("id", todo.id)
      if (error) throw error
      
      if (nowComplete && profile) {
        const newXp = (profile.xp || 0) + (todo.xp_reward || 50)
        const newTotal = (profile.total_xp || 0) + (todo.xp_reward || 50)
        const oldRank = getRank(profile.xp || 0).name
        
        await supabase.from("profiles").update({ xp: newXp, total_xp: newTotal }).eq("id", userId)
        
        toastConfig.xp(`+${todo.xp_reward || 50} XP — Quest Complete!`)
        if (getRank(newXp).name !== oldRank) {
          setTimeout(() => toastConfig.rankUp(`RANK UP! You are now Rank ${getRank(newXp).name}!`), 600)
        }
        queryClient.invalidateQueries({ queryKey: ['profile', userId] })
      } else if (!nowComplete && profile) {
        const newXp = Math.max(0, (profile.xp || 0) - (todo.xp_reward || 50))
        await supabase.from("profiles").update({ xp: newXp }).eq("id", userId)
        toastConfig.info("Quest reopened")
        queryClient.invalidateQueries({ queryKey: ['profile', userId] })
      }
      return nowComplete
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
    },
    onError: () => toastConfig.error("Failed to update quest")
  })

  const deleteQuest = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("todos").delete().eq("id", id)
      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.delete("Quest removed from the System")
    },
    onError: () => toastConfig.error("Failed to delete quest")
  })
  
  const updateQuest = useMutation({
    mutationFn: async ({ id, title }) => {
      const { error } = await supabase.from("todos").update({ title }).eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.success("Quest updated successfully!")
    },
    onError: () => toastConfig.error("Failed to update quest")
  })

  const updatePositions = useMutation({
    mutationFn: async (updates) => {
      for (const update of updates) {
        await supabase.from("todos").update({ position: update.position }).eq("id", update.id)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.success("Quest order updated")
    }
  })

  const addSubtask = useMutation({
    mutationFn: async ({ todoId, title }) => {
      const { data, error } = await supabase.from("subtasks").insert([{
        todo_id: todoId, title, is_completed: false
      }]).select()
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.success("Subtask added!")
    },
    onError: () => toastConfig.error("Failed to add subtask")
  })

  const toggleSubtask = useMutation({
    mutationFn: async ({ subtaskId, isCompleted }) => {
      const { error } = await supabase.from("subtasks").update({ is_completed: !isCompleted }).eq("id", subtaskId)
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quests', userId] }),
    onError: () => toastConfig.error("Failed to update subtask")
  })

  const deleteSubtask = useMutation({
    mutationFn: async (subtaskId) => {
      const { error } = await supabase.from("subtasks").delete().eq("id", subtaskId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.delete("Subtask removed")
    },
    onError: () => toastConfig.error("Failed to delete subtask")
  })

  const clearCompleted = useMutation({
    mutationFn: async (ids) => {
      const { error } = await supabase.from("todos").delete().in("id", ids)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests', userId] })
      toastConfig.delete("Completed quests cleared from the System")
    }
  })

  return {
    todos,
    isLoading,
    addQuest: addQuest.mutate,
    toggleQuest: toggleQuest.mutate,
    deleteQuest: deleteQuest.mutate,
    updateQuest: updateQuest.mutate,
    updatePositions: updatePositions.mutate,
    addSubtask: addSubtask.mutate,
    toggleSubtask: toggleSubtask.mutate,
    deleteSubtask: deleteSubtask.mutate,
    clearCompleted: clearCompleted.mutate
  }
}
