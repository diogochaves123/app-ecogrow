'use client'

import { useState, useEffect } from 'react'
import { Sprout, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

type OnboardingStep = 'splash' | 'slides' | 'quiz' | 'help' | 'result' | 'paywall'

interface QuizAnswers {
  plantCount: string
  plantLocation: string
  experienceLevel: string
  helpNeeds: string[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>('splash')
  const [slideIndex, setSlideIndex] = useState(0)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    plantCount: '',
    plantLocation: '',
    experienceLevel: '',
    helpNeeds: []
  })

  // Splash screen auto-transition
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        setStep('slides')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [step])

  const slides = [
    {
      emoji: '🌱',
      title: 'Cuide melhor das suas plantas',
      subtitle: 'com inteligência.'
    },
    {
      emoji: '📆',
      title: 'Receba lembretes automáticos',
      subtitle: 'de rega, poda e adubação.'
    },
    {
      emoji: '📸',
      title: 'Identifique plantas e detecte doenças',
      subtitle: 'via IA.'
    },
    {
      emoji: '🌍',
      title: 'Feito para todos',
      subtitle: 'de iniciantes a plant lovers.'
    }
  ]

  const quizQuestions = [
    {
      question: 'Quantas plantas você cuida hoje?',
      options: [
        { value: '0', label: '0', emoji: '🌱' },
        { value: '1-3', label: '1-3', emoji: '🌿' },
        { value: '4-10', label: '4-10', emoji: '🪴' },
        { value: '+10', label: '+10', emoji: '🌳' }
      ]
    },
    {
      question: 'Você quer cuidar de:',
      options: [
        { value: 'interior', label: 'Plantas de Interior', emoji: '🌿' },
        { value: 'exterior', label: 'Plantas de Exterior', emoji: '🍃' },
        { value: 'ambas', label: 'Ambas', emoji: '🪴' }
      ]
    },
    {
      question: 'Qual seu nível como cuidador?',
      options: [
        { value: 'beginner', label: 'Iniciante', emoji: '🌱' },
        { value: 'intermediate', label: 'Intermediário', emoji: '🌿' },
        { value: 'expert', label: 'Expert', emoji: '🌳' }
      ]
    }
  ]

  const helpOptions = [
    { value: 'watering', label: 'Rega', emoji: '💧' },
    { value: 'pests', label: 'Pragas', emoji: '🐛' },
    { value: 'identification', label: 'Identificação', emoji: '📸' },
    { value: 'all', label: 'Tudo isso', emoji: '✨' }
  ]

  const handleQuizAnswer = (field: keyof QuizAnswers, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }))
    
    if (quizStep < 2) {
      setTimeout(() => setQuizStep(quizStep + 1), 300)
    } else {
      // Após responder a última pergunta do quiz, vai para a tela de help
      setTimeout(() => setStep('help'), 300)
    }
  }

  const toggleHelpNeed = (value: string) => {
    setQuizAnswers(prev => {
      const current = prev.helpNeeds
      if (current.includes(value)) {
        return { ...prev, helpNeeds: current.filter(v => v !== value) }
      } else {
        return { ...prev, helpNeeds: [...current, value] }
      }
    })
  }

  const getResultMessage = () => {
    const level = quizAnswers.experienceLevel
    if (level === 'beginner') {
      return {
        title: 'Você é um Cuidador Iniciante!',
        description: 'Vamos ajudar você a cuidar das suas plantas com lembretes e dicas personalizadas.',
        emoji: '🌱'
      }
    } else if (level === 'intermediate') {
      return {
        title: 'Você é um Jardineiro Intermediário!',
        description: 'Seu plano vai incluir recomendações avançadas e detecção de pragas.',
        emoji: '🌿'
      }
    } else {
      return {
        title: 'Você é um Expert em Plantas!',
        description: 'Tenha acesso a recursos avançados, IA especializada e comunidade exclusiva.',
        emoji: '🌳'
      }
    }
  }

  // Splash Screen
  if (step === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-green-500 to-lime-500">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm animate-pulse">
            <Sprout className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">EcoGrow</h1>
          <p className="text-white/90 text-lg">Cuidado inteligente de plantas</p>
        </div>
      </div>
    )
  }

  // Slides
  if (step === 'slides') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-12 animate-fade-in">
              <div className="text-8xl mb-6">{slides[slideIndex].emoji}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {slides[slideIndex].title}
              </h2>
              <p className="text-xl text-gray-600">
                {slides[slideIndex].subtitle}
              </p>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === slideIndex
                      ? 'w-8 bg-emerald-600'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep('quiz')}
              >
                Pular
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                onClick={() => {
                  if (slideIndex < slides.length - 1) {
                    setSlideIndex(slideIndex + 1)
                  } else {
                    setStep('quiz')
                  }
                }}
              >
                {slideIndex < slides.length - 1 ? 'Próximo' : 'Começar'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz
  if (step === 'quiz') {
    const currentQuestion = quizQuestions[quizStep]

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Pergunta {quizStep + 1} de 3</span>
                <span>{Math.round(((quizStep + 1) / 3) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300"
                  style={{ width: `${((quizStep + 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <Card className="mb-6 border-emerald-200 animate-fade-in">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      className="w-full h-auto py-4 justify-start text-left hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                      onClick={() => {
                        const field = quizStep === 0 ? 'plantCount' : quizStep === 1 ? 'plantLocation' : 'experienceLevel'
                        handleQuizAnswer(field as keyof QuizAnswers, option.value)
                      }}
                    >
                      <span className="text-2xl mr-3">{option.emoji}</span>
                      <span className="text-lg">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Back button */}
            {quizStep > 0 && (
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => setQuizStep(quizStep - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Help Needs (nova etapa separada)
  if (step === 'help') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Última etapa</span>
                <span>100%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-green-600" />
              </div>
            </div>

            <Card className="border-emerald-200 animate-fade-in">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Você quer ajuda com:
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {helpOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={quizAnswers.helpNeeds.includes(option.value) ? 'default' : 'outline'}
                      className={`h-auto py-4 flex-col gap-2 ${
                        quizAnswers.helpNeeds.includes(option.value)
                          ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                          : 'hover:border-emerald-500 hover:bg-emerald-50'
                      }`}
                      onClick={() => toggleHelpNeed(option.value)}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-sm">{option.label}</span>
                    </Button>
                  ))}
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                  onClick={() => setStep('result')}
                  disabled={quizAnswers.helpNeeds.length === 0}
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Back button */}
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setStep('quiz')
                setQuizStep(2)
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Result
  if (step === 'result') {
    const result = getResultMessage()
    
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div className="animate-fade-in">
              <div className="text-8xl mb-6">{result.emoji}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {result.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {result.description}
              </p>

              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <Card className="border-emerald-200 bg-white/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-2xl mb-2">🪴</div>
                    <div className="text-sm text-gray-600">Plantas</div>
                    <div className="font-semibold text-gray-900">{quizAnswers.plantCount}</div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200 bg-white/50">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-sm text-gray-600">Local</div>
                    <div className="font-semibold text-gray-900 capitalize">{quizAnswers.plantLocation}</div>
                  </CardContent>
                </Card>
              </div>

              <Button
                className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                onClick={() => setStep('paywall')}
              >
                Criar minha conta
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Paywall
  if (step === 'paywall') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade-in">
              <div className="text-6xl mb-4">👑</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                EcoGrow Premium
              </h2>
              <p className="text-gray-600">
                Desbloqueie todo o potencial do seu jardim
              </p>
            </div>

            <Card className="mb-6 border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-4 mb-6">
                  {[
                    'Identificação ilimitada',
                    'Diagnóstico de doenças',
                    'Lembretes inteligentes',
                    'IA mais avançada',
                    'Backup e sincronização na nuvem',
                    'Plantas ilimitadas',
                    'Cuidados adaptados ao clima'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 mb-6 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">💚</span>
                    <Badge className="bg-emerald-600">Teste grátis 7 dias</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Depois apenas:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">R$ 14,90</span>
                    <span className="text-gray-600">/ mês</span>
                  </div>
                  <div className="text-sm text-emerald-700 mt-1">
                    ou R$ 79 / ano (economize 55%)
                  </div>
                </div>

                <Button
                  className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 mb-3"
                  onClick={() => router.push('/auth?premium=true')}
                >
                  Começar teste grátis
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-900"
                  onClick={() => router.push('/auth')}
                >
                  Continuar com versão gratuita
                </Button>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-gray-500">
              Cancele a qualquer momento. Sem compromisso.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
