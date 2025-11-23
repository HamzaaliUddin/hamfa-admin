'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Category } from './useGetCategories.query';

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description: string;
  parent_id?: number;
  image: string;
  icon?: string;
  status: 'active' | 'inactive';
  sort_order: number;
}

interface CreateCategoryResponse {
  data: Category;
  message: string;
}

const createCategory = async (data: CreateCategoryInput): Promise<Category> => {
  const response: CreateCategoryResponse = await axiosInstance.post('/category', data);
  return response.data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to create category';
      toast.error(errorMessage);
    },
  });
};
