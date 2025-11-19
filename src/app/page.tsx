'use client'

import React, { useState, useEffect } from 'react'
import { fetchUserData } from '@/actions'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [activeTab, setActiveTab] = useState('calendar')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const data = await fetchUserData()
      setUser(data)
      setLoading(false)
    }
    loadUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const data = await fetchUserData()
        setUser(data)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">EcoGrow</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl">Welcome, {user.profile?.name || user.user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>

            <div className="mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'tasks' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Tasks
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Profile
                </button>
              </nav>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                {activeTab === 'calendar' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Calendar</h3>
                    <p className="text-gray-500">Your calendar view will appear here.</p>
                    {/* Add calendar component here */}
                  </div>
                )}
                {activeTab === 'tasks' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks</h3>
                    <p className="text-gray-500">Your tasks will appear here.</p>
                    {/* Add tasks component here */}
                  </div>
                )}
                {activeTab === 'profile' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile</h3>
                    <p className="text-gray-500">Your profile information will appear here.</p>
                    {/* Add profile component here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to EcoGrow</h2>
            <p className="text-gray-600 mb-8">Please log in to access your personalized dashboard.</p>
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login with Google
            </button>
          </div>
        )}
      </main>
    </div>
  )
}