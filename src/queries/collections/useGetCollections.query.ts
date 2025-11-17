'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: 'active' | 'inactive';
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

const fetchCollections = async (params?: PaginationParams): Promise<PaginatedResponse<Collection>> => {
  return await axiosInstance.get('collections', { params });
};

export const useGetCollections = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['collections', params],
    queryFn: () => fetchCollections(params),
  });
};

