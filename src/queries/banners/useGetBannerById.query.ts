'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Banner } from './useGetBanners.query';

interface GetBannerByIdResponse {
  data: Banner;
}

const fetchBannerById = async (id: number | string): Promise<Banner> => {
  const response: GetBannerByIdResponse = await axiosInstance.get(`/banner/${id}`);
  return response.data;
};

export const useGetBannerById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['banner', id],
    queryFn: () => fetchBannerById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
