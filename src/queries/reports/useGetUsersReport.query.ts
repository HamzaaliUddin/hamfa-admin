'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';

export interface UsersReportParams {
  startDate?: string;
  endDate?: string;
  period?: 'daily' | 'weekly' | 'monthly';
}

export interface UsersReport {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsersThisMonth: number;
  userGrowth: number;
  totalSpending: number;
  averageSpending: number;
  growthData: Array<{
    date: string;
    newUsers: number;
    totalUsers: number;
  }>;
  topCustomers: Array<{
    user_id: number;
    name: string;
    email: string;
    total_orders: number;
    total_spent: number;
    status: string;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
}

interface GetUsersReportResponse {
  body: {
    data: UsersReport;
  };
}

const fetchUsersReport = async (params?: UsersReportParams): Promise<GetUsersReportResponse> => {
  return await axiosInstance.get('/reports/users', { params });
};

export const useGetUsersReport = (params?: UsersReportParams) => {
  return useQuery({
    queryKey: ['reports', 'users', params],
    queryFn: () => fetchUsersReport(params),
    staleTime: 60 * 1000,
  });
};
