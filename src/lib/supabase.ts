import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          quiz_completed: boolean
          user_type: string | null
          experience_level: string | null
          coins: number
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          quiz_completed?: boolean
          user_type?: string | null
          experience_level?: string | null
          coins?: number
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          quiz_completed?: boolean
          user_type?: string | null
          experience_level?: string | null
          coins?: number
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      plants: {
        Row: {
          id: string
          user_id: string
          name: string
          scientific_name: string | null
          type: string
          category: string
          image_url: string | null
          location: string | null
          light_level: string | null
          health_status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          scientific_name?: string | null
          type: string
          category: string
          image_url?: string | null
          location?: string | null
          light_level?: string | null
          health_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          scientific_name?: string | null
          type?: string
          category?: string
          image_url?: string | null
          location?: string | null
          light_level?: string | null
          health_status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      care_tasks: {
        Row: {
          id: string
          plant_id: string
          user_id: string
          task_type: string
          title: string
          description: string | null
          due_date: string
          completed: boolean
          completed_at: string | null
          recurring: boolean
          frequency_days: number | null
          created_at: string
        }
        Insert: {
          id?: string
          plant_id: string
          user_id: string
          task_type: string
          title: string
          description?: string | null
          due_date: string
          completed?: boolean
          completed_at?: string | null
          recurring?: boolean
          frequency_days?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          plant_id?: string
          user_id?: string
          task_type?: string
          title?: string
          description?: string | null
          due_date?: string
          completed?: boolean
          completed_at?: string | null
          recurring?: boolean
          frequency_days?: number | null
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          title: string
          description: string
          coins_reward: number
          points_reward: number
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          title: string
          description: string
          coins_reward?: number
          points_reward?: number
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          title?: string
          description?: string
          coins_reward?: number
          points_reward?: number
          unlocked_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          plant_id: string | null
          title: string
          content: string
          image_url: string | null
          likes: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plant_id?: string | null
          title: string
          content: string
          image_url?: string | null
          likes?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plant_id?: string | null
          title?: string
          content?: string
          image_url?: string | null
          likes?: number
          created_at?: string
        }
      }
    }
  }
}
