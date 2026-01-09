'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Brand, BrandStatus } from './useGetBrands.query';

export interface CreateBrandInput {
  name: string;
  logo: string;
  status?: BrandStatus;
}

interface CreateBrandResponse {
  data: Brand;
}

const createBrand = async (data: FormData | CreateBrandInput): Promise<Brand> => {
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
      const errorMessage = error?.data?.message || error?.message || 'Failed to create brand';
      toast.error(errorMessage);
    },
  });
};
