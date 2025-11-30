import axiosInstance from '@/services/axiosInstance';
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

const onLogin = async (data: LoginRequest): Promise<any> => {
  return await axiosInstance.post('/auth/login', data);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: onLogin,
    onSuccess: (data) => {
      console.log('✅ Login success data:', data);
      toast.success('OTP sent to your email!');
    },
    onError: (error: any) => {
      console.error('❌ Login error:', error);
      const errorMessage = error?.data?.message || error?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};
