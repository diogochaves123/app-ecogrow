import { createClient } from '@supabase/supabase-js'

// Garantir que as variáveis sejam lidas corretamente tanto no servidor quanto no cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criar cliente com valores padrão seguros para o build
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
    }
  }
)

// Função helper para verificar se o Supabase está configurado
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co')
}

// Avisar no cliente se não estiver configurado
if (typeof window !== 'undefined' && !isSupabaseConfigured()) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas.')
  console.warn('Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY')
}
