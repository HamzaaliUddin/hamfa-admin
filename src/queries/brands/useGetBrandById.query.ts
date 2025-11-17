'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Brand } from './useGetBrands.query';

const fetchBrandById = async (id: number | string): Promise<Brand> => {
  return await axiosInstance.get(`brands/${id}`);
};

export const useGetBrandById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => fetchBrandById(id!),
    enabled: !!id,
  });
};

