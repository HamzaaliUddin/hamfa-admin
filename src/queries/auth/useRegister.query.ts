import axiosInstance from '@/api/axios';
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
      // Store token and user in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));

      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      const errorMessage =
        error?.error || error?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};
