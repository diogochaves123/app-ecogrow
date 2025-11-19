'use client'

import { useState, useEffect } from 'react'
import { Sprout, Leaf, Calendar, MessageCircle, Users, Trophy, Plus, Search, Bell, Settings, Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { getCurrentUser, getUserProfile } from '@/lib/auth'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [plants, setPlants] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  async function loadUserData() {
    try {
      // Verificar se Supabase está configurado
      if (!isSupabaseConfigured()) {
        console.log('Supabase não configurado - usando modo demo')
        setLoading(false)
        return
      }

      const currentUser = await getCurrentUser()
      
      if (!currentUser) {
        console.log('Usuário não autenticado - usando modo demo')
        setLoading(false)
        return
      }

      setUser(currentUser)

      // Carregar perfil
      const userProfile = await getUserProfile(currentUser.id)
      setProfile(userProfile)

      // Carregar plantas
      const { data: plantsData, error: plantsError } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(6)

      if (!plantsError) {
        setPlants(plantsData || [])
      }

      // Carregar tarefas
      const { data: tasksData, error: tasksError } = await supabase
        .from('care_tasks')
        .select('*, plants(name)')
        .eq('user_id', currentUser.id)
        .eq('completed', false)
        .order('due_date', { ascending: true })
        .limit(5)

      if (!tasksError) {
        setTasks(tasksData || [])
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      }
      window.location.href = '/'
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }

  const userStats = {
    name: profile?.full_name || user?.email?.split('@')[0] || 'Jardineiro',
    plants: plants.length,
    coins: profile?.coins || 0,
    points: profile?.points || 0,
    level: Math.floor((profile?.points || 0) / 100) + 1,
    streak: 0
  }

  const getTaskIcon = (taskType: string) => {
    switch (taskType) {
      case 'water': return '💧'
      case 'prune': return '✂️'
      case 'fertilize': return '🌱'
      case 'pest_control': return '🐛'
      case 'harvest': return '🌾'
      default: return '📋'
    }
  }

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'excellent':
        return { label: 'Excelente', className: 'bg-emerald-100 text-emerald-700 border-emerald-300' }
      case 'good':
        return { label: 'Boa', className: 'bg-green-100 text-green-700 border-green-300' }
      case 'fair':
        return { label: 'Regular', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
      case 'poor':
        return { label: 'Ruim', className: 'bg-red-100 text-red-700 border-red-300' }
      default:
        return { label: 'Boa', className: 'bg-green-100 text-green-700 border-green-300' }
    }
  }

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return 'Amanhã'
    if (diffDays === -1) return 'Ontem'
    if (diffDays < 0) return `${Math.abs(diffDays)} dias atrás`
    return `Em ${diffDays} dias`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-emerald-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                EcoGrow
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="gap-2" onClick={() => setActiveTab('home')}>
                <Leaf className="w-4 h-4" />
                Minhas Plantas
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => setActiveTab('calendar')}>
                <Calendar className="w-4 h-4" />
                Calendário
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => setActiveTab('ai')}>
                <MessageCircle className="w-4 h-4" />
                IA Assistente
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => setActiveTab('community')}>
                <Users className="w-4 h-4" />
                Comunidade
              </Button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Bell className="w-5 h-5" />
                {tasks.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Settings className="w-5 h-5" />
              </Button>
              {user && (
                <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sair">
                  <LogOut className="w-5 h-5" />
                </Button>
              )}
              <Avatar className="w-9 h-9 cursor-pointer border-2 border-emerald-500">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                  {userStats.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false) }}>
                  <Leaf className="w-4 h-4" />
                  Minhas Plantas
                </Button>
                <Button variant="ghost" className="justify-start gap-2" onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false) }}>
                  <Calendar className="w-4 h-4" />
                  Calendário
                </Button>
                <Button variant="ghost" className="justify-start gap-2" onClick={() => { setActiveTab('ai'); setMobileMenuOpen(false) }}>
                  <MessageCircle className="w-4 h-4" />
                  IA Assistente
                </Button>
                <Button variant="ghost" className="justify-start gap-2" onClick={() => { setActiveTab('community'); setMobileMenuOpen(false) }}>
                  <Users className="w-4 h-4" />
                  Comunidade
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Olá, {userStats.name}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Bem-vindo ao seu jardim inteligente
          </p>
        </div>

        {/* Supabase Not Configured Warning */}
        {!isSupabaseConfigured() && (
          <Card className="mb-8 border-amber-300 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Configure o Supabase
              </CardTitle>
              <CardDescription className="text-amber-700">
                Para usar todas as funcionalidades, conecte sua conta Supabase nas Configurações do Projeto → Integrações
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader className="pb-3">
              <CardDescription className="text-emerald-700">Plantas</CardDescription>
              <CardTitle className="text-3xl text-emerald-900">{userStats.plants}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader className="pb-3">
              <CardDescription className="text-amber-700">Moedas</CardDescription>
              <CardTitle className="text-3xl text-amber-900">{userStats.coins}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="pb-3">
              <CardDescription className="text-purple-700">Pontos</CardDescription>
              <CardTitle className="text-3xl text-purple-900">{userStats.points}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-700">Nível</CardDescription>
              <CardTitle className="text-3xl text-blue-900">{userStats.level}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button 
              className="h-auto py-6 flex-col gap-2 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
              onClick={() => alert('Funcionalidade disponível após configurar o Supabase')}
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Adicionar Planta</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2 border-emerald-200 hover:bg-emerald-50">
              <Search className="w-6 h-6 text-emerald-600" />
              <span className="text-sm text-emerald-700">Identificar</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2 border-blue-200 hover:bg-blue-50">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-blue-700">Perguntar IA</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col gap-2 border-purple-200 hover:bg-purple-50">
              <Trophy className="w-6 h-6 text-purple-600" />
              <span className="text-sm text-purple-700">Conquistas</span>
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Próximas Tarefas
                </CardTitle>
                <CardDescription>Cuidados agendados para suas plantas</CardDescription>
              </CardHeader>
              <CardContent>
                {tasks.length > 0 ? (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getTaskIcon(task.task_type)}</div>
                          <div>
                            <p className="font-medium text-gray-900">{task.plants?.name || 'Planta'}</p>
                            <p className="text-sm text-gray-600">{task.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {formatDueDate(task.due_date)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhuma tarefa agendada</p>
                    <p className="text-sm mt-1">Adicione plantas para começar!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Plants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  Minhas Plantas
                </CardTitle>
                <CardDescription>Acompanhe a saúde do seu jardim</CardDescription>
              </CardHeader>
              <CardContent>
                {plants.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {plants.map((plant) => {
                      const healthBadge = getHealthBadge(plant.health_status)
                      const healthValue = plant.health_status === 'excellent' ? 100 : plant.health_status === 'good' ? 80 : plant.health_status === 'fair' ? 60 : 40
                      
                      return (
                        <div
                          key={plant.id}
                          className="p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="text-4xl">🌿</div>
                            <Badge variant="outline" className={healthBadge.className}>
                              {healthBadge.label}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{plant.name}</h3>
                          <p className="text-sm text-gray-600">{plant.type}</p>
                          <Progress value={healthValue} className="mt-3 h-2" />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Sprout className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhuma planta cadastrada</p>
                    <Button 
                      className="mt-4 bg-gradient-to-r from-emerald-500 to-green-600"
                      onClick={() => alert('Funcionalidade disponível após configurar o Supabase')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Primeira Planta
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile & Tips */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
              <CardHeader>
                <CardTitle className="text-emerald-900">Seu Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16 border-2 border-emerald-500">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white text-xl">
                      {userStats.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{userStats.name}</p>
                    <p className="text-sm text-gray-600">Nível {userStats.level}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium text-emerald-700">
                      {((userStats.points % 100) / 100 * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={(userStats.points % 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  Dica do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      💡 <strong>Rega inteligente:</strong> Verifique a umidade do solo antes de regar. 
                      Enfie o dedo 2-3cm na terra - se estiver seco, é hora de regar!
                    </p>
                  </div>
                  <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    Ver Mais Dicas
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Comunidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Conecte-se com outros amantes de plantas, compartilhe fotos e aprenda juntos!
                  </p>
                  <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    Explorar Comunidade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-gray-600">
                EcoGrow - Cuidado inteligente de plantas
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-emerald-600 transition-colors">Sobre</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Premium</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Ajuda</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
