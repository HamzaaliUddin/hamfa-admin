import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/verify-otp'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Get token from cookie or check localStorage (client-side)
  const token = request.cookies.get('admin_token')?.value;

  // If trying to access protected route without token, redirect to login
  if (!isPublicPath && !token) {
    // Check if there's a token in the request headers (for client-side navigation)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (isPublicPath && token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
