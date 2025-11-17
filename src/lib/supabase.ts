import { createClient } from '@supabase/supabase-js'

// Garantir que as variáveis sejam lidas corretamente tanto no servidor quanto no cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação para evitar erro de inicialização
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas.')
  console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Definida' : '❌ Não definida')
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Definida' : '❌ Não definida')
  console.warn('O cliente Supabase não será inicializado até que as variáveis sejam configuradas.')
}

// Criar cliente apenas se as variáveis estiverem disponíveis
// Caso contrário, exporta um objeto mock para evitar erros de runtime
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any // Mock para evitar erro de inicialização
