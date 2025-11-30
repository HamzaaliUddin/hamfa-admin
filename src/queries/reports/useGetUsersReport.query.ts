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
  newUsers: number;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  usersByStatus: Array<{
    status: string;
    count: number;
  }>;
}

const fetchUsersReport = async (params?: UsersReportParams): Promise<UsersReport> => {
  return await axiosInstance.get('reports/users', { params });
};

export const useGetUsersReport = (params?: UsersReportParams) => {
  return useQuery({
    queryKey: ['reports', 'users', params],
    queryFn: () => fetchUsersReport(params),
  });
};

