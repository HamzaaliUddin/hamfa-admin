'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteBrandResponse {
  message: string;
}

const deleteBrand = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteBrandResponse>(`/brand/${id}`);
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete brand';
      toast.error(errorMessage);
    },
  });
};

