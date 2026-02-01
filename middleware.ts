import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAdmin = request.nextUrl.pathname.startsWith('/admin')

  
  if (isAdmin && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
