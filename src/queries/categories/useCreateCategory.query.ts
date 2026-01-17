'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Category, CategoryStatus } from './useGetCategories.query';

export interface CreateCategoryInput {
  name: string;
  position?: number | null;
  image?: string | null;
  show_on_home?: boolean;
  status: CategoryStatus;
}

interface CreateCategoryResponse {
  data: Category;
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
      const errorMessage = error?.data?.message || error?.message || 'Failed to create category';
      toast.error(errorMessage);
    },
  });
};
