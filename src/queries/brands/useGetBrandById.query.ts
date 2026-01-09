'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Brand } from './useGetBrands.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchBrandById = async (id: number | string): Promise<Brand> => {
  const response = await axiosInstance.get(`/brand/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetBrandById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => fetchBrandById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
