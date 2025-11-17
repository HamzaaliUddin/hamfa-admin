'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  images?: string[];
  categoryId?: number;
  brandId?: number;
  createdAt: string;
  updatedAt: string;
}

const fetchProducts = async (params?: PaginationParams): Promise<PaginatedResponse<Product>> => {
  return await axiosInstance.get('products', { params });
};

export const useGetProducts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
};

