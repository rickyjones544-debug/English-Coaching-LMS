import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/api/auth',
  ];

  // Protected routes
  const protectedRoutes = [
    '/dashboard',
    '/admin',
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Get the token from the cookies (for Supabase)
  const token = request.cookies.get('supabase-auth-token')?.value;

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If trying to access auth routes with token, redirect based on user type
  if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
    // For simplicity, redirect to dashboard. In a real app, you'd decode the token
    // to check if user is admin and redirect accordingly
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
