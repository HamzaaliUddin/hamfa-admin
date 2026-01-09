'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Brand status enum matching backend
export type BrandStatus = 'active' | 'inactive';

export interface Brand {
  brand_id: number;
  name: string;
  slug: string;
  logo: string;
  status: BrandStatus;
  collection_count: number;
  created_at?: string;
  updated_at?: string;
  // Joined data (optional)
  collections?: Array<{
    collection_id: number;
    title: string;
  }>;
}

export interface GetBrandsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  search?: string;
}

interface GetBrandsResponse {
  data: Brand[];
  count: number;
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
