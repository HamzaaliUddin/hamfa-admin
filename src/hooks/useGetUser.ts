'use client';

/**
 * Hook to get the current user from localStorage
 */
export const useGetUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('admin_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export default useGetUser;

