import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { toast } from 'sonner';

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await axiosInstance.post<any, any>('/auth/change-password', data);
      return response;
    },
    onSuccess: () => {
      toast.success('Password changed successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to change password';
      toast.error(errorMessage);
    },
  });
};

