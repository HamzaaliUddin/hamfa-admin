'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';

const deleteTerms = async (id: number | string): Promise<void> => {
  return await axiosInstance.delete(`terms/${id}`);
};

export const useDeleteTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms deleted successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to delete terms');
    },
  });
};

