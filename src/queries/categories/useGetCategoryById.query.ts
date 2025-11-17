'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Category } from './useGetCategories.query';

const fetchCategoryById = async (id: number | string): Promise<Category> => {
  return await axiosInstance.get(`categories/${id}`);
};

export const useGetCategoryById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id!),
    enabled: !!id,
  });
};

