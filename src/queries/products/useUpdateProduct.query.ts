'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Product } from './useGetProducts.query';
import { CreateProductInput } from './useCreateProduct.query';

type UpdateProductInput = Partial<CreateProductInput>;

interface UpdateProductParams {
  id: number | string;
  data: UpdateProductInput;
}

interface UpdateProductResponse {
  data: Product;
  message: string;
}

const updateProduct = async ({ id, data }: UpdateProductParams): Promise<Product> => {
  const response: UpdateProductResponse = await axiosInstance.put(`/product/${id}`, data);
  return response.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update product';
      toast.error(errorMessage);
    },
  });
};
