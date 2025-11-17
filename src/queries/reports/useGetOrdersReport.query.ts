'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';

export interface OrdersReportParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface OrdersReport {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  ordersByStatus: Array<{
    status: string;
    count: number;
  }>;
  ordersByDate: Array<{
    date: string;
    count: number;
  }>;
}

const fetchOrdersReport = async (params?: OrdersReportParams): Promise<OrdersReport> => {
  return await axiosInstance.get('reports/orders', { params });
};

export const useGetOrdersReport = (params?: OrdersReportParams) => {
  return useQuery({
    queryKey: ['reports', 'orders', params],
    queryFn: () => fetchOrdersReport(params),
  });
};

