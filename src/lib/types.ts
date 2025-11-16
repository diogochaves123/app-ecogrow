export type PlantType = 
  | 'hortalica'
  | 'fruta'
  | 'erva'
  | 'flor'
  | 'medicinal'
  | 'ornamental'
  | 'arvore_frutifera'
  | 'arvore_nativa'
  | 'arvore_ornamental'
  | 'domestica'

export type PlantCategory = 
  | 'vegetable'
  | 'fruit'
  | 'herb'
  | 'flower'
  | 'medicinal'
  | 'ornamental'
  | 'tree'
  | 'indoor'

export type TaskType = 
  | 'watering'
  | 'fertilizing'
  | 'pruning'
  | 'pest_control'
  | 'harvesting'
  | 'repotting'
  | 'cleaning'

export type HealthStatus = 
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor'
  | 'critical'

export type LightLevel = 
  | 'full_sun'
  | 'partial_sun'
  | 'partial_shade'
  | 'full_shade'

export type UserType = 
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert'

export interface Plant {
  id: string
  user_id: string
  name: string
  scientific_name?: string
  type: PlantType
  category: PlantCategory
  image_url?: string
  location?: string
  light_level?: LightLevel
  health_status: HealthStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface CareTask {
  id: string
  plant_id: string
  user_id: string
  task_type: TaskType
  title: string
  description?: string
  due_date: string
  completed: boolean
  completed_at?: string
  recurring: boolean
  frequency_days?: number
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  quiz_completed: boolean
  user_type?: UserType
  experience_level?: string
  coins: number
  points: number
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  user_id: string
  achievement_type: string
  title: string
  description: string
  coins_reward: number
  points_reward: number
  unlocked_at: string
}

export interface CommunityPost {
  id: string
  user_id: string
  plant_id?: string
  title: string
  content: string
  image_url?: string
  likes: number
  created_at: string
}

export interface QuizAnswer {
  question: string
  answer: string
}

export interface CarePlan {
  watering_frequency: number
  fertilizing_frequency: number
  pruning_frequency?: number
  light_requirement: LightLevel
  temperature_range: string
  humidity_level: string
  special_care: string[]
}
