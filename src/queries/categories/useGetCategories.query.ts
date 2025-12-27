'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Category {
  category_id: number;
  name: string;
  slug: string;
  description: string;
  parent_id?: number;
  image: string;
  status: 'active' | 'inactive';
  product_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  parent_id?: number;
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
