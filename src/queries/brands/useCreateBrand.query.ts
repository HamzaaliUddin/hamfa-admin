'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Brand } from './useGetBrands.query';

export interface CreateBrandInput {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  status?: 'active' | 'inactive';
}

const createBrand = async (data: CreateBrandInput): Promise<Brand> => {
  return await axiosInstance.post('brands', data);
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand created successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to create brand');
    },
  });
};

