'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Product } from './useGetProducts.query';

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  status?: 'active' | 'inactive';
  images?: string[];
  categoryId?: number;
  brandId?: number;
}

const createProduct = async (data: CreateProductInput): Promise<Product> => {
  return await axiosInstance.post('products', data);
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to create product');
    },
  });
};

