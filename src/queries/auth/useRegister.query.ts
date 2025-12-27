import axiosInstance from '@/services/axiosInstance';
import { authUtils } from '@/utils/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role_id: number;
  brand_id?: number;
}

interface RegisterResponse {
  user: {
    user_id: number;
    name: string;
    email: string;
  };
  token: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await axiosInstance.post<any, { data: RegisterResponse }>(
        '/auth/register',
        data
      );
      return response.data;
    },
    onSuccess: data => {
      // Store token in cookies and user in localStorage using authUtils
      authUtils.setToken(data.token);
      authUtils.setUser(data.user as any);

      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};
