'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';

export interface OrdersReportParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface OrdersReport {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  statusDistribution: Array<{
    status: string;
    count: number;
    percentage: number;
    revenue: number;
  }>;
  recentOrders: Array<{
    order_id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    items_count: number;
    total: number;
    status: string;
    created_at: string;
  }>;
  dailyOrders: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
}

interface GetOrdersReportResponse {
  body: {
    data: OrdersReport;
  };
}

const fetchOrdersReport = async (params?: OrdersReportParams): Promise<GetOrdersReportResponse> => {
  return await axiosInstance.get('/reports/orders', { params });
};

export const useGetOrdersReport = (params?: OrdersReportParams) => {
  return useQuery({
    queryKey: ['reports', 'orders', params],
    queryFn: () => fetchOrdersReport(params),
    staleTime: 60 * 1000,
  });
};
