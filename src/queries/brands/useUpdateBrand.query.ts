'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Brand } from './useGetBrands.query';
import { CreateBrandInput } from './useCreateBrand.query';

type UpdateBrandInput = Partial<CreateBrandInput>;

interface UpdateBrandParams {
  id: number | string;
  data: UpdateBrandInput;
}

interface UpdateBrandResponse {
  data: Brand;
  message: string;
}

const updateBrand = async ({ id, data }: UpdateBrandParams): Promise<Brand> => {
  const response: UpdateBrandResponse = await axiosInstance.put(`/brand/${id}`, data);
  return response.data;
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBrand,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['brand', variables.id] });
      toast.success('Brand updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update brand';
      toast.error(errorMessage);
    },
  });
};

