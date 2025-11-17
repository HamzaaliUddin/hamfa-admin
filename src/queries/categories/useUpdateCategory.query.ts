'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Category } from './useGetCategories.query';
import { CreateCategoryInput } from './useCreateCategory.query';

type UpdateCategoryInput = Partial<CreateCategoryInput>;

interface UpdateCategoryParams {
  id: number | string;
  data: UpdateCategoryInput;
}

const updateCategory = async ({ id, data }: UpdateCategoryParams): Promise<Category> => {
  return await axiosInstance.put(`categories/${id}`, data);
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
      toast.success('Category updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update category');
    },
  });
};

