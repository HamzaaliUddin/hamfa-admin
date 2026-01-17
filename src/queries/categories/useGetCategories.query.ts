'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export type CategoryStatus = 'active' | 'inactive';

// Category interface matching backend
export interface Category {
  category_id: number;
  name: string;
  slug: string;
  position: number | null;
  image: string | null;
  show_on_home: boolean;
  status: CategoryStatus;
  created_at?: string;
  updated_at?: string;
  // Joined data (optional)
  collections?: Array<{
    collection_id: number;
    title: string;
    slug: string;
  }>;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  search?: string;
  showOnHome?: boolean;
  status?: CategoryStatus;
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
