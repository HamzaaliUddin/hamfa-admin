'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Banner } from './useGetBanners.query';

export interface CreateBannerInput {
  title: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  redirect_url?: string;
  sort_order: number;
  start_date?: string;
  end_date?: string;
}

interface CreateBannerResponse {
  data: Banner;
  message: string;
}

const createBanner = async (data: CreateBannerInput): Promise<Banner> => {
  const response: CreateBannerResponse = await axiosInstance.post('/banner', data);
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
      const errorMessage = error?.error || error?.message || 'Failed to create banner';
      toast.error(errorMessage);
    },
  });
};
