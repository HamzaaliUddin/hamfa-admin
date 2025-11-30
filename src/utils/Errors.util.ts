/**
 * Extracts error message from various error formats
 */
export const getErrorMessage = (error: any): string => {
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle axios error format
  if (error?.data?.message) {
    return error.data.message;
  }

  // Handle error with message property
  if (error?.message) {
    return error.message;
  }

  // Handle error with error property
  if (error?.error) {
    return error.error;
  }

  // Handle array of errors
  if (Array.isArray(error)) {
    return error.map(e => getErrorMessage(e)).join(', ');
  }

  // Handle validation errors
  if (error?.data?.errors) {
    const errors = error.data.errors;
    if (Array.isArray(errors)) {
      return errors.map((e: any) => e.message || e).join(', ');
    }
    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }
  }

  // Default error message
  return 'An error occurred. Please try again.';
};

/**
 * Formats field validation errors for form display
 */
export const formatFieldErrors = (error: any): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};

  if (error?.data?.errors) {
    const errors = error.data.errors;
    if (typeof errors === 'object' && !Array.isArray(errors)) {
      Object.keys(errors).forEach(field => {
        fieldErrors[field] = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
      });
    }
  }

  return fieldErrors;
};

/**
 * Checks if error is a network error
 */
export const isNetworkError = (error: any): boolean => {
  return error?.message === 'Network Error' || error?.code === 'ECONNABORTED' || !error?.status;
};

/**
 * Checks if error is an authentication error
 */
export const isAuthError = (error: any): boolean => {
  return error?.status === 401 || error?.status === 403;
};

/**
 * Checks if error is a validation error
 */
export const isValidationError = (error: any): boolean => {
  return error?.status === 422 || error?.status === 400;
};

/**
 * Throws form field errors from API response
 */
export const throwFormError = (error: any, setError?: any): void => {
  const fieldErrors = formatFieldErrors(error);
  
  if (setError && Object.keys(fieldErrors).length > 0) {
    Object.keys(fieldErrors).forEach(field => {
      setError(field, {
        type: 'manual',
        message: fieldErrors[field],
      });
    });
  }
};