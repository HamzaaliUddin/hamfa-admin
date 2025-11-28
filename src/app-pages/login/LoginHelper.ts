import { RegisterOptions } from 'react-hook-form';
import { LoginFormData } from './login.schema';

/**
 * Validation rules for login form fields
 */
export const loginValidationRules: Record<keyof LoginFormData, RegisterOptions<LoginFormData>> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
};

/**
 * Default form values
 */
export const loginDefaultValues: LoginFormData = {
  email: '',
  password: '',
};

/**
 * Error messages for login form
 */
export const loginErrorMessages = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  SERVER_ERROR: 'Server error. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
  MISSING_DATA: 'Login failed. Please try again',
} as const;

/**
 * Form field configurations
 */
export const loginFormFields = {
  email: {
    id: 'email',
    name: 'email' as const,
    type: 'email',
    label: 'Email',
    placeholder: '@gmail.com',
  },
  password: {
    id: 'password',
    name: 'password' as const,
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
  },
} as const;

