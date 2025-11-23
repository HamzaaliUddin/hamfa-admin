import axiosInstance from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user_id: number;
  email: string;
  requiresOTP: boolean;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      console.log('🚀 Login request:', data);
      const response = await axiosInstance.post<any, { data: LoginResponse }>('/auth/login', data);
      console.log('✅ Login response:', response);
      return response.data;
    },
    onSuccess: data => {
      console.log('✅ Login success data:', data);
      toast.success('OTP sent to your email!');
    },
    onError: (error: any) => {
      console.error('❌ Login error:', error);
      const errorMessage = error?.error || error?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};
