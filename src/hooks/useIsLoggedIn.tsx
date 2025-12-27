'use client';

import { authUtils } from '@/utils/auth';
import { useMemo } from 'react';

/**
 * Hook for checking if user is logged in
 */
export const useIsLoggedIn = (): boolean => {
  const isLoggedIn = useMemo(() => {
    if (typeof window !== 'undefined') {
      return authUtils.isAuthenticated();
    }
    return false;
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
