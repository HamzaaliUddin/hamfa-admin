'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface TopProduct {
  product_id: number;
  title: string;
  total_sold: number;
  revenue: number;
}

export interface GetTopProductsParams {
  limit?: number;
}

interface GetTopProductsResponse {
  data: TopProduct[];
}

const fetchTopProducts = async (params?: GetTopProductsParams): Promise<TopProduct[]> => {
  const response: GetTopProductsResponse = await axiosInstance.get('/reports/top-products', { params });
  return response.data;
};

export const useGetTopProducts = (params?: GetTopProductsParams) => {
  return useQuery({
    queryKey: ['top-products', params],
    queryFn: () => fetchTopProducts(params),
    staleTime: 300 * 1000, // 5 minutes
  });
};

