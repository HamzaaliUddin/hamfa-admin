'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Brand } from './useGetBrands.query';

interface GetBrandByIdResponse {
  data: Brand;
}

const fetchBrandById = async (id: number | string): Promise<Brand> => {
  const response: GetBrandByIdResponse = await axiosInstance.get(`/brand/${id}`);
  return response.data;
};

export const useGetBrandById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => fetchBrandById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};

