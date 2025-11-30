'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';

export interface ProductsReportParams {
  startDate?: string;
  endDate?: string;
  sortBy?: 'sales' | 'revenue' | 'views';
  limit?: number;
}

export interface ProductsReport {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  topSellingProducts: Array<{
    id: number;
    name: string;
    sales: number;
    revenue: number;
  }>;
  categoryDistribution: Array<{
    categoryId: number;
    categoryName: string;
    productCount: number;
  }>;
}

const fetchProductsReport = async (params?: ProductsReportParams): Promise<ProductsReport> => {
  return await axiosInstance.get('reports/products', { params });
};

export const useGetProductsReport = (params?: ProductsReportParams) => {
  return useQuery({
    queryKey: ['reports', 'products', params],
    queryFn: () => fetchProductsReport(params),
  });
};

