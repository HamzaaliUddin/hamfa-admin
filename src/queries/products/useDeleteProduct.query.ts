'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteProductResponse {
  message: string;
}

const deleteProduct = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteProductResponse>(`/product/${id}`);
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete product';
      toast.error(errorMessage);
    },
  });
};
