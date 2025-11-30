'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/utils/auth';
import { ROUTES } from '@/utils/route';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authUtils.isAuthenticated();
      
      console.log('🔍 ProtectedRoute: Checking authentication:', authenticated);
      
      if (!authenticated) {
        console.log('❌ Not authenticated, redirecting to login');
        router.push(ROUTES.AUTH.LOGIN);
      } else {
        console.log('✅ Authenticated, allowing access');
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

