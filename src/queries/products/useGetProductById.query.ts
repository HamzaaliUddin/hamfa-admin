'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Product } from './useGetProducts.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchProductById = async (id: number | string): Promise<Product> => {
  const response = await axiosInstance.get(`/product/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetProductById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
