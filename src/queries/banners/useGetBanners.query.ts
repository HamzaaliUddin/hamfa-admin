'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Banner {
  banner_id: number;
  title: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetBannersParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  search?: string;
}

interface GetBannersResponse {
  body: {
  data: Banner[];
  count: number;
  };
}

const fetchBanners = async (params?: GetBannersParams): Promise<GetBannersResponse> => {
  return await axiosInstance.get('/banner', { params });
};

export const useGetBanners = (params?: GetBannersParams) => {
  return useQuery({
    queryKey: ['banners', params],
    queryFn: () => fetchBanners(params),
    staleTime: 60 * 1000,
  });
};
