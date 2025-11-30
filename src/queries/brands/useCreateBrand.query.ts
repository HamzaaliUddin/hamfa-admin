'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Brand } from './useGetBrands.query';

export interface CreateBrandInput {
  name: string;
  slug: string;
  description: string;
  logo: string;
  website?: string;
  status: 'active' | 'inactive';
  featured?: boolean;
}

interface CreateBrandResponse {
  data: Brand;
  message: string;
}

const createBrand = async (data: CreateBrandInput): Promise<Brand> => {
  const response: CreateBrandResponse = await axiosInstance.post('/brand', data);
  return response.data;
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to create brand';
      toast.error(errorMessage);
    },
  });
};

