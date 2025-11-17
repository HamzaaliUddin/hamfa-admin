'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Terms {
  id: number;
  title: string;
  slug: string;
  content: string;
  type: 'terms' | 'privacy' | 'refund' | 'shipping';
  status: 'active' | 'inactive';
  version?: string;
  createdAt: string;
  updatedAt: string;
}

const fetchTerms = async (params?: PaginationParams): Promise<PaginatedResponse<Terms>> => {
  return await axiosInstance.get('terms', { params });
};

export const useGetTerms = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['terms', params],
    queryFn: () => fetchTerms(params),
  });
};

