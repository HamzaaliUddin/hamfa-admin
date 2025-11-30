'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Category } from './useGetCategories.query';

interface GetCategoryByIdResponse {
  body: {
  data: Category;
  };
}

const fetchCategoryById = async (id: number | string): Promise<Category> => {
  const response: GetCategoryByIdResponse = await axiosInstance.get(`/category/${id}`);
  return response.body.data;
};

export const useGetCategoryById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
