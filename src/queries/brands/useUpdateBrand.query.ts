'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Brand } from './useGetBrands.query';
import { CreateBrandInput } from './useCreateBrand.query';

type UpdateBrandInput = Partial<CreateBrandInput>;

interface UpdateBrandParams {
  id: number | string;
  data: FormData | UpdateBrandInput;
}

interface UpdateBrandResponse {
  body: {
    data: Brand;
  };
  message: string;
}

const updateBrand = async ({ id, data }: UpdateBrandParams): Promise<UpdateBrandResponse> => {
  const response: UpdateBrandResponse = await axiosInstance.put(`/brand/${id}`, data);
  return response;
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBrand,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['brand', variables.id] });
    },
  });
};

