import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    return null
  }
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getUserProfile(userId: string) {
  if (!isSupabaseConfigured()) {
    return null
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

export async function signOut() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured')
  }
  
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function updateProfile(userId: string, updates: any) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured')
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    throw error
  }

  return data
}
