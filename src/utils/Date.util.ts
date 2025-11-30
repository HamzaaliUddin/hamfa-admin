import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

/**
 * Formats a date string to a readable format
 */
export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatStr);
  } catch {
    return '';
  }
};

/**
 * Formats a date string to a readable date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'MMM dd, yyyy hh:mm a');
};

/**
 * Formats a date string to time only
 */
export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'hh:mm a');
};

/**
 * Gets relative time from now (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: string | Date): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return '';
  }
};

/**
 * Checks if a date is today
 */
export const isToday = (date: string | Date): boolean => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  } catch {
    return false;
  }
};

