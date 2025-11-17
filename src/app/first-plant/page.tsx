'use client'

import { useState } from 'react'
import { Sprout, Camera, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

const popularPlants = [
  { name: 'Manjericão', emoji: '🌿', type: 'herb', category: 'herb' },
  { name: 'Costela-de-Adão', emoji: '🍃', type: 'ornamental', category: 'indoor' },
  { name: 'Suculenta', emoji: '🌵', type: 'ornamental', category: 'indoor' },
  { name: 'Tomate Cereja', emoji: '🍅', type: 'hortalica', category: 'vegetable' },
  { name: 'Árvore Frutífera', emoji: '🌳', type: 'arvore_frutifera', category: 'tree' },
  { name: 'Lavanda', emoji: '💜', type: 'medicinal', category: 'herb' }
]

export default function FirstPlantPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  async function handleAddPlant(plantName: string, plantType: string, plantCategory: string) {
    setLoading(true)
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/auth')
        return
      }

      const { error } = await supabase
        .from('plants')
        .insert({
          user_id: user.id,
          name: plantName,
          type: plantType,
          category: plantCategory,
          health_status: 'good',
          location: 'Casa'
        })

      if (error) throw error

      // Award welcome achievement
      await supabase
        .from('achievements')
        .insert({
          user_id: user.id,
          achievement_type: 'first_plant',
          title: 'Primeira Planta',
          description: 'Você adicionou sua primeira planta!',
          coins_reward: 50,
          points_reward: 100
        })

      // Update user coins and points
      await supabase.rpc('increment_user_rewards', {
        user_id: user.id,
        coins_amount: 50,
        points_amount: 100
      })

      router.push('/')
    } catch (error) {
      console.error('Erro ao adicionar planta:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPlants = searchQuery
    ? popularPlants.filter(plant => 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularPlants

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Header */}
      <header className="p-6 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">EcoGrow</h1>
            <p className="text-sm text-gray-600">Adicione sua primeira planta</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Adicione sua primeira planta
            </h2>
            <p className="text-lg text-gray-600">
              Comece sua jornada de cuidados inteligentes
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar planta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <Card className="border-emerald-200 hover:border-emerald-400 transition-all cursor-pointer hover:shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-green-100">
                  <Camera className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Tirar Foto</h3>
                  <p className="text-sm text-gray-600">Identificar com IA</p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                  IA
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Adicionar Manual</h3>
                  <p className="text-sm text-gray-600">Digitar nome</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Plants */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Plantas Populares
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredPlants.map((plant, index) => (
                <Card
                  key={index}
                  className="border-gray-200 hover:border-emerald-400 transition-all cursor-pointer hover:shadow-md"
                  onClick={() => handleAddPlant(plant.name, plant.type, plant.category)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="text-4xl">{plant.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{plant.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{plant.category}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPlants.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhuma planta encontrada</p>
                <p className="text-sm mt-1">Tente outro termo de busca</p>
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explorar por Categoria
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Hortaliças', emoji: '🥬', color: 'from-green-400 to-emerald-500' },
                { name: 'Frutas', emoji: '🍎', color: 'from-red-400 to-pink-500' },
                { name: 'Ervas', emoji: '🌿', color: 'from-lime-400 to-green-500' },
                { name: 'Flores', emoji: '🌸', color: 'from-pink-400 to-rose-500' },
                { name: 'Medicinais', emoji: '💊', color: 'from-purple-400 to-indigo-500' },
                { name: 'Ornamentais', emoji: '🪴', color: 'from-teal-400 to-cyan-500' },
                { name: 'Árvores', emoji: '🌳', color: 'from-amber-400 to-orange-500' },
                { name: 'Suculentas', emoji: '🌵', color: 'from-emerald-400 to-teal-500' }
              ].map((category, index) => (
                <Card
                  key={index}
                  className="border-gray-200 hover:border-emerald-400 transition-all cursor-pointer hover:shadow-md"
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                      {category.emoji}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skip Button */}
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => router.push('/')}
            >
              Pular por enquanto
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
