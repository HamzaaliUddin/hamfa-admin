/**
 * Server-side rendering utility functions
 */

/**
 * Checks if code is running on server
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};

/**
 * Checks if code is running on client
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Gets a value safely on both server and client
 */
export const getSafeValue = <T>(clientValue: T, serverValue: T): T => {
  return isClient() ? clientValue : serverValue;
};

/**
 * Executes code only on client side
 */
export const clientOnly = (callback: () => void): void => {
  if (isClient()) {
    callback();
  }
};

/**
 * Executes code only on server side
 */
export const serverOnly = (callback: () => void): void => {
  if (isServer()) {
    callback();
  }
};
