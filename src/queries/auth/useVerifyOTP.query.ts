'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

interface VerifyOTPRequest {
  user_id: number;
  otp_code: string;
  remember_me?: boolean;
}

interface VerifyOTPResponse {
  status: number;
  message: string;
  body: {
    data: {
      user: {
        user_id: number;
        name: string;
        email: string;
        role: {
          role_id: number;
          name: string;
          permissions?: Array<{
            permission_id: number;
            module: string;
            action: string;
            description: string;
          }>;
        };
        brand?: {
          brand_id: number;
          name: string;
        };
      };
      token: string;
      refreshToken: string;
      expiresIn: string;
    };
  };
  errors: null;
}

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
      const response = await axiosInstance.post('/auth/verify-otp', data);
      return response as unknown as VerifyOTPResponse;
    },
    onSuccess: (response: VerifyOTPResponse) => {
      // The actual data is in response.body
      const data = response?.body?.data;

      console.log('Verify OTP Response:', response);
      console.log('Token from response:', data?.token);

      if (!data?.token) {
        console.error('No token found in response:', response);
        toast.error('Authentication failed. Please try again.');
        return;
      }

      // Store tokens and user in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));

      // Also set in cookies for middleware
      Cookies.set('admin_token', data.token, {
        expires: 30, // Expires in 30 days
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'strict', // Prevent CSRF attacks
      });

      toast.success('OTP verified successfully!');

      // Redirect to dashboard
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
      }
    },
    onError: (error: { data?: { message?: string }; message?: string }) => {
      console.error('OTP verification error:', error);
      const errorMessage = error?.data?.message || error?.message || 'Invalid or expired OTP';
      toast.error(errorMessage);
    },
  });
};
