'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Banner {
  id: number;
  title: string;
  description?: string;
  image: string;
  link?: string;
  position: 'home-hero' | 'home-secondary' | 'sidebar' | 'footer';
  status: 'active' | 'inactive';
  order?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

const fetchBanners = async (params?: PaginationParams): Promise<PaginatedResponse<Banner>> => {
  return await axiosInstance.get('banners', { params });
};

export const useGetBanners = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['banners', params],
    queryFn: () => fetchBanners(params),
  });
};

