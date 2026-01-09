'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Product, ProductSize, ProductStatus, ProductType } from './useGetProducts.query';

export interface CreateProductInput {
  title: string;
  description: string;
  sku?: string; // Optional - auto-generated if not provided
  image: string;
  images?: string[];
  price: number;
  stock: number;
  low_stock_threshold?: number;
  brand_id: number;
  collection_id: number;
  status?: ProductStatus;
  size: ProductSize;
  product_type: ProductType;
}

interface CreateProductResponse {
  data: Product;
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
      const errorMessage = error?.data?.message || error?.message || 'Failed to create product';
      toast.error(errorMessage);
    },
  });
};
