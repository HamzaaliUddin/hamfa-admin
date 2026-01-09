'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Category interface matching backend - only has name and category_id
export interface Category {
  category_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  // Joined data (optional)
  collections?: Array<{
    collection_id: number;
    title: string;
  }>;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  search?: string;
}

interface GetCategoriesResponse {
  data: Category[];
  count: number;
}

const fetchCategories = async (params?: GetCategoriesParams): Promise<GetCategoriesResponse> => {
  return await axiosInstance.get('/category', { params });
};

export const useGetCategories = (params?: GetCategoriesParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => fetchCategories(params),
    staleTime: 60 * 1000,
  });
};
