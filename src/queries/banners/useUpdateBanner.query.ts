'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Banner } from './useGetBanners.query';
import { CreateBannerInput } from './useCreateBanner.query';

type UpdateBannerInput = Partial<CreateBannerInput>;

interface UpdateBannerParams {
  id: number | string;
  data: UpdateBannerInput;
}

const updateBanner = async ({ id, data }: UpdateBannerParams): Promise<Banner> => {
  return await axiosInstance.put(`banners/${id}`, data);
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBanner,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['banner', variables.id] });
      toast.success('Banner updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update banner');
    },
  });
};

