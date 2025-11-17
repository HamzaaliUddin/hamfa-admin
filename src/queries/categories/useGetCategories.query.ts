'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: number;
  status: 'active' | 'inactive';
  order?: number;
  createdAt: string;
  updatedAt: string;
}

const fetchCategories = async (params?: PaginationParams): Promise<PaginatedResponse<Category>> => {
  return await axiosInstance.get('categories', { params });
};

export const useGetCategories = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => fetchCategories(params),
  });
};

