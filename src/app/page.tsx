'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/utils/auth';
import { ROUTES } from '@/utils/route';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = authUtils.isAuthenticated();
    
    if (isAuthenticated) {
      // Redirect to dashboard if authenticated
      router.push(ROUTES.DASHBOARD);
    } else {
      // Redirect to login if not authenticated
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
}
