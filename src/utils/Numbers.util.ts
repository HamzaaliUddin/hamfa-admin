/**
 * Formats a number to currency format
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  if (amount === null || amount === undefined) return '';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

/**
 * Formats a number with thousand separators
 */
export const formatNumber = (
  num: number,
  locale: string = 'en-US'
): string => {
  if (num === null || num === undefined) return '';
  
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch {
    return num.toString();
  }
};

/**
 * Formats a number to percentage
 */
export const formatPercentage = (
  num: number,
  decimals: number = 2
): string => {
  if (num === null || num === undefined) return '';
  return `${num.toFixed(decimals)}%`;
};

/**
 * Rounds a number to specified decimal places
 */
export const roundNumber = (num: number, decimals: number = 2): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Clamps a number between min and max values
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Generates a random number between min and max
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

