'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Brand } from './useGetBrands.query';
import { CreateBrandInput } from './useCreateBrand.query';

type UpdateBrandInput = Partial<CreateBrandInput>;

interface UpdateBrandParams {
  id: number | string;
  data: UpdateBrandInput;
}

const updateBrand = async ({ id, data }: UpdateBrandParams): Promise<Brand> => {
  return await axiosInstance.put(`brands/${id}`, data);
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
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update brand');
    },
  });
};

