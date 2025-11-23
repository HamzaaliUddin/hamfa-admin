'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from './useGetProducts.query';

interface GetProductByIdResponse {
  data: Product;
}

const fetchProductById = async (id: number | string): Promise<Product> => {
  const response: GetProductByIdResponse = await axiosInstance.get(`/product/${id}`);
  return response.data;
};

export const useGetProductById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
