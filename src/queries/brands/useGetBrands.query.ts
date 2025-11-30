'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Brand {
  brand_id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  status: 'active' | 'inactive';
  product_count?: number;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetBrandsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  featured?: boolean;
  search?: string;
}

interface GetBrandsResponse {
  status: number;
  message: string;
  body: {
    data: Brand[];
    count: number;
  };
  errors: null;
}

const fetchBrands = async (params?: GetBrandsParams): Promise<GetBrandsResponse> => {
  return await axiosInstance.get('/brand', { params });
};

export const useGetBrands = (params?: GetBrandsParams) => {
  return useQuery({
    queryKey: ['brands', params],
    queryFn: () => fetchBrands(params),
    staleTime: 60 * 1000,
  });
};
