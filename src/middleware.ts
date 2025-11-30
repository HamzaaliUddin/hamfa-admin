import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/verify-otp', '/'];
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`) || pathname.startsWith(`${path}?`)
  );

  // Get token from cookie
  const token = request.cookies.get('admin_token')?.value;

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/verify-otp' || pathname === '/')) {
    console.log('🔄 Authenticated user accessing auth page, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If trying to access protected route without token, redirect to login
  if (!isPublicPath && !token) {
    console.log('🔒 Unauthenticated user accessing protected route, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|logo).*)',
  ],
};
