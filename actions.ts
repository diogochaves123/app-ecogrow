'use server'

import { getCurrentUser, getUserProfile } from '@/lib/auth'

export async function fetchUserData() {
  const user = await getCurrentUser()
  if (!user) return null

  const profile = await getUserProfile(user.id)
  return { user, profile }
}