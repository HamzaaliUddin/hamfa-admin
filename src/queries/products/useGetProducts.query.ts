'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Product {
  product_id: number;
  title: string;
  description: string;
  sku: string;
  image: string;
  images: string[];
  price: number;
  discount_price?: number;
  cost?: number;
  profit?: number;
  stock: number;
  low_stock_threshold: number;
  brand_id: number;
  category_id: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  featured: boolean;
  size: 'small' | 'medium' | 'large';
  product_type: 'stitched' | 'unstitched';
  created_at?: string;
  updated_at?: string;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  featured?: boolean;
  brand_id?: number;
  category_id?: number;
  search?: string;
}

interface GetProductsResponse {
  body: {
  data: Product[];
  count: number;
  };
}

const fetchProducts = async (params?: GetProductsParams): Promise<GetProductsResponse> => {
  return await axiosInstance.get('/product', { params });
};

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 60 * 1000,
  });
};
