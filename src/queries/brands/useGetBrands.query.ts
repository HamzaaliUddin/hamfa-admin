'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  status: 'active' | 'inactive';
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

const fetchBrands = async (params?: PaginationParams): Promise<PaginatedResponse<Brand>> => {
  return await axiosInstance.get('brands', { params });
};

export const useGetBrands = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['brands', params],
    queryFn: () => fetchBrands(params),
  });
};

