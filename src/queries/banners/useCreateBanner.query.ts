'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Banner } from './useGetBanners.query';

export interface CreateBannerInput {
  title: string;
  description?: string;
  image: string;
  link?: string;
  position?: Banner['position'];
  status?: 'active' | 'inactive';
  order?: number;
  startDate?: string;
  endDate?: string;
}

const createBanner = async (data: CreateBannerInput): Promise<Banner> => {
  return await axiosInstance.post('banners', data);
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner created successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to create banner');
    },
  });
};

