'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteCategoryResponse {
  message: string;
}

const deleteCategory = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteCategoryResponse>(`/category/${id}`);
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete category';
      toast.error(errorMessage);
    },
  });
};
