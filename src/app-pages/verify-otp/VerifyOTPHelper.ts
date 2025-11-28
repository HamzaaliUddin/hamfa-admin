import { RegisterOptions } from 'react-hook-form';
import { VerifyOTPFormData } from './verifyOTP.schema';

/**
 * Validation rules for verify OTP form fields
 */
export const verifyOTPValidationRules: Record<
  keyof VerifyOTPFormData,
  RegisterOptions<VerifyOTPFormData>
> = {
  otp_code: {
    required: 'OTP code is required',
    pattern: {
      value: /^\d{6}$/,
      message: 'OTP must be exactly 6 digits',
    },
  },
  remember_me: {},
};

/**
 * Default form values
 */
export const verifyOTPDefaultValues: VerifyOTPFormData = {
  otp_code: '',
  remember_me: false,
};

/**
 * Error messages for verify OTP form
 */
export const verifyOTPErrorMessages = {
  INVALID_OTP: 'Invalid or expired OTP',
  SERVER_ERROR: 'Server error. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
  MISSING_USER_ID: 'User ID not found. Please login again',
  RESEND_SUCCESS: 'OTP resent successfully',
  RESEND_ERROR: 'Failed to resend OTP. Please try again',
} as const;

/**
 * Form field configurations
 */
export const verifyOTPFormFields = {
  otp_code: {
    id: 'otp_code',
    name: 'otp_code' as const,
    type: 'text',
    label: 'Enter OTP Code',
    placeholder: '000000',
  },
  remember_me: {
    id: 'remember_me',
    name: 'remember_me' as const,
    label: 'Remember me for 30 days',
  },
} as const;

