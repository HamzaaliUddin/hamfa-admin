/**
 * Regular expression patterns for validation
 */

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const ALPHA_REGEX = /^[A-Za-z]+$/;

export const ALPHANUMERIC_REGEX = /^[A-Za-z0-9]+$/;

export const NUMERIC_REGEX = /^[0-9]+$/;

export const DECIMAL_REGEX = /^[0-9]+(\.[0-9]+)?$/;

/**
 * Validation helper functions
 */

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

export const isValidURL = (url: string): boolean => {
  return URL_REGEX.test(url);
};

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

export const isAlpha = (str: string): boolean => {
  return ALPHA_REGEX.test(str);
};

export const isAlphanumeric = (str: string): boolean => {
  return ALPHANUMERIC_REGEX.test(str);
};

export const isNumeric = (str: string): boolean => {
  return NUMERIC_REGEX.test(str);
};

export const isDecimal = (str: string): boolean => {
  return DECIMAL_REGEX.test(str);
};

