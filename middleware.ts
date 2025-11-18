import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Verificar se Supabase está configurado
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  )

  // Se Supabase não estiver configurado, redirecionar para onboarding
  if (!isConfigured && req.nextUrl.pathname === '/') {
    const redirectUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Se Supabase não estiver configurado, permitir acesso às outras rotas
  if (!isConfigured) {
    return res
  }

  // Supabase configurado - verificar autenticação
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth', '/onboarding', '/auth/callback']
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))

  // Se não está autenticado e tentando acessar rota protegida
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Se está autenticado e tentando acessar onboarding ou auth
  if (session && (req.nextUrl.pathname.startsWith('/auth') || req.nextUrl.pathname === '/onboarding')) {
    const redirectUrl = new URL('/', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|lasy-bridge.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
