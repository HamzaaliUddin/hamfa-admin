'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  pendingOrders: number;
  lowStockProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

interface GetDashboardStatsResponse {
  data: DashboardStats;
}

const fetchDashboardStats = async (): Promise<GetDashboardStatsResponse> => {
  const response = await axiosInstance.get('/reports/dashboard');
  return response;
};

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 60 * 1000, // 1 minute
  });
};
