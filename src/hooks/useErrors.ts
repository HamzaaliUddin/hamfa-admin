'use client';

import { getErrorMessage } from '@/utils/Errors.util';

/**
 * Hook for handling errors consistently
 */
export const useErrors = () => {
  const getError = (error: any): string => {
    return getErrorMessage(error);
  };

  const handleError = (error: any, callback?: (message: string) => void): void => {
    const message = getErrorMessage(error);
    if (callback) {
      callback(message);
    }
  };

  return {
    getError,
    handleError
  };
};

export default useErrors;

