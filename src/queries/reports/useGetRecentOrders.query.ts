'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface RecentOrder {
  order_id: number;
  order_number: string;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
}

export interface GetRecentOrdersParams {
  limit?: number;
}

interface GetRecentOrdersResponse {
  data: RecentOrder[];
}

const fetchRecentOrders = async (
  params?: GetRecentOrdersParams
): Promise<GetRecentOrdersResponse> => {
  const response = await axiosInstance.get('/reports/recent-orders', { params });
  return response;
};

export const useGetRecentOrders = (params?: GetRecentOrdersParams) => {
  return useQuery({
    queryKey: ['recent-orders', params],
    queryFn: () => fetchRecentOrders(params),
    staleTime: 60 * 1000,
  });
};
