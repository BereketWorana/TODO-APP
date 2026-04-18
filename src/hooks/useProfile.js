import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export function useProfile(userId) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      let { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
      
      if (error || !data) {
        // If profile doesn't exist, create it
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: userId }])
          .select()
          .single()
          
        if (insertError) throw insertError
        return newProfile
      }
      return data
    },
    enabled: !!userId,
  })
}
