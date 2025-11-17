'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Product } from './useGetProducts.query';
import { CreateProductInput } from './useCreateProduct.query';

type UpdateProductInput = Partial<CreateProductInput>;

interface UpdateProductParams {
  id: number | string;
  data: UpdateProductInput;
}

const updateProduct = async ({ id, data }: UpdateProductParams): Promise<Product> => {
  return await axiosInstance.put(`products/${id}`, data);
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
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update product');
    },
  });
};

