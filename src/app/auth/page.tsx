'use client'

import { useState, useEffect } from 'react'
import { Sprout, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isPremium = searchParams.get('premium') === 'true'
  
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is already logged in
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      router.push('/')
    }
  }

  async function handleAuth() {
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        // Sign up
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        })

        if (signUpError) throw signUpError

        if (authData.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: authData.user.email,
              full_name: fullName,
              coins: 100, // Welcome bonus
              points: 0,
              quiz_completed: false
            })

          if (profileError) throw profileError

          router.push('/first-plant')
        }
      } else {
        // Sign in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (signInError) throw signInError

        if (data.user) {
          router.push('/')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Header */}
      <header className="p-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => router.push('/onboarding')}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
              <Sprout className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
              EcoGrow
            </h1>
            {isPremium && (
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600">
                <Sparkles className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          {/* Auth Card */}
          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {mode === 'login' ? 'Bem-vindo de volta!' : 'Criar conta'}
              </CardTitle>
              <CardDescription className="text-center">
                {mode === 'login' 
                  ? 'Entre para continuar cuidando das suas plantas' 
                  : 'Comece sua jornada com plantas inteligentes'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email/Password Form */}
              <div className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                      className="h-12"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="pl-10 pr-10 h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                  onClick={handleAuth}
                  disabled={loading || !email || !password || (mode === 'signup' && !fullName)}
                >
                  {loading ? 'Carregando...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
                </Button>
              </div>

              {/* Toggle Mode */}
              <div className="text-center text-sm">
                <span className="text-gray-600">
                  {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                </span>
                {' '}
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login')
                    setError('')
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {mode === 'login' ? 'Criar conta' : 'Entrar'}
                </button>
              </div>

              {mode === 'login' && (
                <div className="text-center">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Esqueceu a senha?
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Ao continuar, você concorda com nossos{' '}
            <a href="#" className="underline hover:text-gray-700">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="underline hover:text-gray-700">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
}