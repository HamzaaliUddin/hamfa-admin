'use client';

import { useRouter } from 'next/navigation';
import URLs from '@/utils/URLs.util';

/**
 * Hook for signing out user
 */
export const useSignOut = () => {
  const router = useRouter();

  const signOut = () => {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      
      // Clear cookie
      document.cookie = 'admin_token=; path=/; max-age=0';
    }

    // Redirect to login
    router.push(URLs.Login);
  };

  return { signOut };
};

export default useSignOut;

