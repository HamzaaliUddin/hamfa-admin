'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Brand } from './useGetBrands.query';

export interface CreateBrandInput {
  name: string;
  description: string;
  logo: string;
  status: 'active' | 'inactive';
  featured?: boolean;
}

interface CreateBrandResponse {
  body: {
    data: Brand;
  };
  message: string;
}

const createBrand = async (data: FormData | CreateBrandInput): Promise<CreateBrandResponse> => {
  const response: CreateBrandResponse = await axiosInstance.post('/brand', data);
  return response;
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};
