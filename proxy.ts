import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'
  const isLoginPage = request.nextUrl.pathname === '/dashboard/login'
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  
  if (isDashboard && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
