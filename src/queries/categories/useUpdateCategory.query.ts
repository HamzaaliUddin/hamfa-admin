'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Category } from './useGetCategories.query';
import { CreateCategoryInput } from './useCreateCategory.query';

type UpdateCategoryInput = Partial<CreateCategoryInput>;

interface UpdateCategoryParams {
  id: number | string;
  data: UpdateCategoryInput;
}

interface UpdateCategoryResponse {
  body: {
  data: Category;
  };
  message: string;
}

const updateCategory = async ({ id, data }: UpdateCategoryParams): Promise<Category> => {
  const response: UpdateCategoryResponse = await axiosInstance.put(`/category/${id}`, data);
  return response.body.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update category';
      toast.error(errorMessage);
    },
  });
};
