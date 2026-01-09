'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Category } from './useGetCategories.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchCategoryById = async (id: number | string): Promise<Category> => {
  const response = await axiosInstance.get(`/category/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetCategoryById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
