'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Product } from './useGetProducts.query';

export interface CreateProductInput {
  title: string;
  description: string;
  sku: string;
  image: string;
  images: string[];
  price: number;
  compare_price?: number;
  cost?: number;
  stock: number;
  low_stock_threshold: number;
  brand_id: number;
  category_id: number;
  tags?: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  featured?: boolean;
  has_variants?: boolean;
  weight?: number;
  dimensions?: any;
}

interface CreateProductResponse {
  data: Product;
  message: string;
}

const createProduct = async (data: CreateProductInput): Promise<Product> => {
  const response: CreateProductResponse = await axiosInstance.post('/product', data);
  return response.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to create product';
      toast.error(errorMessage);
    },
  });
};
