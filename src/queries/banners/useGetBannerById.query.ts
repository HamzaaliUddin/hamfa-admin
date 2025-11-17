'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Banner } from './useGetBanners.query';

const fetchBannerById = async (id: number | string): Promise<Banner> => {
  return await axiosInstance.get(`banners/${id}`);
};

export const useGetBannerById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['banner', id],
    queryFn: () => fetchBannerById(id!),
    enabled: !!id,
  });
};

