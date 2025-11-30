'use client';

import { useEffect, useState } from 'react';

/**
 * Hook for checking if user is logged in
 */
export const useIsLoggedIn = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;

