import { PlantType, LightLevel, CarePlan } from './types'

export const PLANT_TYPES = [
  { value: 'hortalica', label: 'Hortaliça', icon: '🥬' },
  { value: 'fruta', label: 'Fruta', icon: '🍎' },
  { value: 'erva', label: 'Erva', icon: '🌿' },
  { value: 'flor', label: 'Flor', icon: '🌸' },
  { value: 'medicinal', label: 'Medicinal', icon: '💊' },
  { value: 'ornamental', label: 'Ornamental', icon: '🪴' },
  { value: 'arvore_frutifera', label: 'Árvore Frutífera', icon: '🌳' },
  { value: 'arvore_nativa', label: 'Árvore Nativa', icon: '🌲' },
  { value: 'arvore_ornamental', label: 'Árvore Ornamental', icon: '🌴' },
  { value: 'domestica', label: 'Planta Doméstica', icon: '🏠' },
] as const

export const TASK_TYPES = [
  { value: 'watering', label: 'Rega', icon: '💧' },
  { value: 'fertilizing', label: 'Adubação', icon: '🌱' },
  { value: 'pruning', label: 'Poda', icon: '✂️' },
  { value: 'pest_control', label: 'Controle de Pragas', icon: '🐛' },
  { value: 'harvesting', label: 'Colheita', icon: '🌾' },
  { value: 'repotting', label: 'Replantio', icon: '🪴' },
  { value: 'cleaning', label: 'Limpeza', icon: '🧹' },
] as const

export const LIGHT_LEVELS = [
  { value: 'full_sun', label: 'Sol Pleno', description: '6+ horas de sol direto' },
  { value: 'partial_sun', label: 'Sol Parcial', description: '3-6 horas de sol' },
  { value: 'partial_shade', label: 'Meia Sombra', description: '2-3 horas de sol' },
  { value: 'full_shade', label: 'Sombra Total', description: 'Luz indireta' },
] as const

export const HEALTH_STATUS = [
  { value: 'excellent', label: 'Excelente', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { value: 'good', label: 'Boa', color: 'text-green-600', bgColor: 'bg-green-100' },
  { value: 'fair', label: 'Regular', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { value: 'poor', label: 'Ruim', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: 'critical', label: 'Crítico', color: 'text-red-600', bgColor: 'bg-red-100' },
] as const

export const QUIZ_QUESTIONS = [
  {
    id: 'experience',
    question: 'Qual é o seu nível de experiência com plantas?',
    options: [
      { value: 'beginner', label: 'Iniciante - Nunca cuidei de plantas' },
      { value: 'intermediate', label: 'Intermediário - Tenho algumas plantas' },
      { value: 'advanced', label: 'Avançado - Tenho um jardim/horta' },
      { value: 'expert', label: 'Especialista - Sou jardineiro profissional' },
    ],
  },
  {
    id: 'space',
    question: 'Onde você pretende cultivar suas plantas?',
    options: [
      { value: 'apartment', label: 'Apartamento (interno)' },
      { value: 'house_indoor', label: 'Casa (interno)' },
      { value: 'balcony', label: 'Varanda/Sacada' },
      { value: 'garden', label: 'Jardim/Quintal' },
      { value: 'farm', label: 'Chácara/Sítio' },
    ],
  },
  {
    id: 'time',
    question: 'Quanto tempo você pode dedicar por dia?',
    options: [
      { value: 'minimal', label: '5-10 minutos' },
      { value: 'moderate', label: '15-30 minutos' },
      { value: 'dedicated', label: '30-60 minutos' },
      { value: 'extensive', label: 'Mais de 1 hora' },
    ],
  },
  {
    id: 'interest',
    question: 'Qual é o seu principal interesse?',
    options: [
      { value: 'decoration', label: 'Decoração e beleza' },
      { value: 'food', label: 'Cultivar alimentos' },
      { value: 'medicinal', label: 'Plantas medicinais' },
      { value: 'hobby', label: 'Hobby e relaxamento' },
      { value: 'sustainability', label: 'Sustentabilidade' },
    ],
  },
  {
    id: 'climate',
    question: 'Como é o clima da sua região?',
    options: [
      { value: 'tropical', label: 'Tropical (quente e úmido)' },
      { value: 'subtropical', label: 'Subtropical (temperado)' },
      { value: 'dry', label: 'Seco (pouca chuva)' },
      { value: 'cold', label: 'Frio (inverno rigoroso)' },
    ],
  },
] as const

export const DEFAULT_CARE_PLANS: Record<PlantType, CarePlan> = {
  hortalica: {
    watering_frequency: 1,
    fertilizing_frequency: 14,
    pruning_frequency: 21,
    light_requirement: 'full_sun',
    temperature_range: '18-28°C',
    humidity_level: '60-70%',
    special_care: ['Rega regular', 'Solo rico em nutrientes', 'Controle de pragas'],
  },
  fruta: {
    watering_frequency: 2,
    fertilizing_frequency: 30,
    pruning_frequency: 90,
    light_requirement: 'full_sun',
    temperature_range: '20-30°C',
    humidity_level: '50-70%',
    special_care: ['Poda de formação', 'Adubação orgânica', 'Proteção contra pássaros'],
  },
  erva: {
    watering_frequency: 2,
    fertilizing_frequency: 21,
    light_requirement: 'partial_sun',
    temperature_range: '15-25°C',
    humidity_level: '50-60%',
    special_care: ['Colheita regular', 'Boa drenagem', 'Ventilação'],
  },
  flor: {
    watering_frequency: 2,
    fertilizing_frequency: 14,
    pruning_frequency: 30,
    light_requirement: 'partial_sun',
    temperature_range: '18-25°C',
    humidity_level: '60-70%',
    special_care: ['Remoção de flores murchas', 'Adubação para floração', 'Proteção do vento'],
  },
  medicinal: {
    watering_frequency: 3,
    fertilizing_frequency: 30,
    light_requirement: 'partial_shade',
    temperature_range: '18-26°C',
    humidity_level: '50-65%',
    special_care: ['Cultivo orgânico', 'Colheita no momento certo', 'Secagem adequada'],
  },
  ornamental: {
    watering_frequency: 3,
    fertilizing_frequency: 21,
    pruning_frequency: 60,
    light_requirement: 'partial_shade',
    temperature_range: '18-28°C',
    humidity_level: '60-80%',
    special_care: ['Limpeza de folhas', 'Umidade constante', 'Luz indireta'],
  },
  arvore_frutifera: {
    watering_frequency: 7,
    fertilizing_frequency: 60,
    pruning_frequency: 180,
    light_requirement: 'full_sun',
    temperature_range: '20-32°C',
    humidity_level: '50-70%',
    special_care: ['Poda anual', 'Adubação orgânica', 'Controle de pragas e doenças'],
  },
  arvore_nativa: {
    watering_frequency: 7,
    fertilizing_frequency: 90,
    pruning_frequency: 365,
    light_requirement: 'full_sun',
    temperature_range: '15-30°C',
    humidity_level: '50-80%',
    special_care: ['Adaptada ao clima local', 'Pouca manutenção', 'Preservação ambiental'],
  },
  arvore_ornamental: {
    watering_frequency: 7,
    fertilizing_frequency: 60,
    pruning_frequency: 180,
    light_requirement: 'full_sun',
    temperature_range: '18-30°C',
    humidity_level: '50-70%',
    special_care: ['Poda de formação', 'Controle de crescimento', 'Estética'],
  },
  domestica: {
    watering_frequency: 7,
    fertilizing_frequency: 30,
    pruning_frequency: 90,
    light_requirement: 'partial_shade',
    temperature_range: '18-26°C',
    humidity_level: '60-80%',
    special_care: ['Luz indireta', 'Umidade ambiente', 'Limpeza de folhas'],
  },
}

export const ACHIEVEMENTS = [
  {
    type: 'first_plant',
    title: 'Primeira Planta',
    description: 'Cadastrou sua primeira planta',
    coins: 50,
    points: 100,
  },
  {
    type: 'week_streak',
    title: 'Semana Dedicada',
    description: 'Completou tarefas por 7 dias seguidos',
    coins: 100,
    points: 200,
  },
  {
    type: 'plant_collector',
    title: 'Colecionador',
    description: 'Possui 10 plantas cadastradas',
    coins: 200,
    points: 500,
  },
  {
    type: 'green_thumb',
    title: 'Mão Verde',
    description: 'Manteve uma planta saudável por 30 dias',
    coins: 150,
    points: 300,
  },
  {
    type: 'community_star',
    title: 'Estrela da Comunidade',
    description: 'Recebeu 50 curtidas em posts',
    coins: 250,
    points: 600,
  },
] as const
