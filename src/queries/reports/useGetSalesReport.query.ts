'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';

export interface SalesReportParams {
  startDate?: string;
  endDate?: string;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface SalesReport {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  revenue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  periodData: Array<{
    date: string;
    sales: number;
    orders: number;
    revenue: number;
  }>;
  topProducts: Array<{
    product_id: number;
    title: string;
    sales: number;
    revenue: number;
  }>;
}

interface GetSalesReportResponse {
  body: {
    data: SalesReport;
  };
}

const fetchSalesReport = async (params?: SalesReportParams): Promise<GetSalesReportResponse> => {
  return await axiosInstance.get('/reports/sales', { params });
};

export const useGetSalesReport = (params?: SalesReportParams) => {
  return useQuery({
    queryKey: ['reports', 'sales', params],
    queryFn: () => fetchSalesReport(params),
    staleTime: 60 * 1000,
  });
};
