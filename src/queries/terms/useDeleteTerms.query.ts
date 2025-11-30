'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteTermsResponse {
  message: string;
}

const deleteTerms = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteTermsResponse>(`/term/${id}`);
};

export const useDeleteTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete terms';
      toast.error(errorMessage);
    },
  });
};
