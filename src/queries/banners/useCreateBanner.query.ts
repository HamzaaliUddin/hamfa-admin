'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Banner } from './useGetBanners.query';

// Banner only has image in backend
export interface CreateBannerInput {
  image: string;
}

interface CreateBannerResponse {
  data: Banner;
}

const createBanner = async (data: CreateBannerInput | FormData): Promise<Banner> => {
  const isFormData = data instanceof FormData;
  const response: CreateBannerResponse = await axiosInstance.post('/banner', data, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return response.data;
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.data?.message || error?.message || 'Failed to create banner';
      toast.error(errorMessage);
    },
  });
};
