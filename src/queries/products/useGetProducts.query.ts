'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Product status enum matching backend
export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';

// Product size enum matching backend
export type ProductSize = 'small' | 'medium' | 'large';

// Product type enum matching backend
export type ProductType = 'stitched' | 'unstitched';

export interface Product {
  product_id: number;
  title: string;
  slug: string;
  description: string;
  sku: string;
  image: string;
  images: string[];
  price: number;
  stock: number;
  low_stock_threshold: number;
  brand_id: number;
  collection_id: number;
  status: ProductStatus;
  size: ProductSize;
  product_type: ProductType;
  created_at?: string;
  updated_at?: string;
  // Joined data (optional)
  brand?: {
    brand_id: number;
    name: string;
  };
  collection?: {
    collection_id: number;
    title: string;
  };
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  brand_id?: number;
  collection_id?: number;
  size?: ProductSize;
  product_type?: ProductType;
  search?: string;
}

interface GetProductsResponse {
  data: Product[];
  count: number;
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
