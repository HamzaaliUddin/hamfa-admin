'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Banner } from './useGetBanners.query';
import { CreateBannerInput } from './useCreateBanner.query';

type UpdateBannerInput = Partial<CreateBannerInput>;

interface UpdateBannerParams {
  id: number | string;
  data: UpdateBannerInput | FormData;
}

interface UpdateBannerResponse {
  data: Banner;
}

const updateBanner = async ({ id, data }: UpdateBannerParams): Promise<Banner> => {
  const response: UpdateBannerResponse = await axiosInstance.put(`/banner/${id}`, data);
  return response.data;
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
    onError: (error: any) => {
      const errorMessage = error?.data?.message || error?.message || 'Failed to update banner';
      toast.error(errorMessage);
    },
  });
};
