'use client';

import { authUtils } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import URLs from '@/utils/URLs.util';

/**
 * Hook for signing out user
 */
export const useSignOut = () => {
  const router = useRouter();

  const signOut = () => {
    // Use authUtils to handle logout properly
    authUtils.logout();
  };

  return { signOut };
};

export default useSignOut;

