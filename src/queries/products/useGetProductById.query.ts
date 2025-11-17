'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Product } from './useGetProducts.query';

const fetchProductById = async (id: number | string): Promise<Product> => {
  return await axiosInstance.get(`products/${id}`);
};

export const useGetProductById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
};

