'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { ErrorResponseType } from '@/types/api.types';

const deleteAdmin = async (adminId: number): Promise<void> => {
  return await axiosInstance.delete(`/admin/${adminId}`);
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Admin deleted successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || error?.data?.error || 'Failed to delete admin');
    },
  });
};
