'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { ErrorResponseType } from '@/types/api.types';

const deleteUser = async (id: number | string): Promise<void> => {
  return await axiosInstance.delete(`users/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to delete user');
    },
  });
};

