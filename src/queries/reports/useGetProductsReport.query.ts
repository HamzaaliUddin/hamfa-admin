'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';

export interface ProductsReportParams {
  startDate?: string;
  endDate?: string;
  category_id?: number;
  brand_id?: number;
}

export interface ProductsReport {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;
  totalStockValue: number;
  totalStockUnits: number;
  averagePrice: number;
  topSellingProducts: Array<{
    product_id: number;
    title: string;
    sku: string;
    stock: number;
    price: number;
    total_sold: number;
    revenue: number;
    status: string;
  }>;
  lowStockAlerts: Array<{
    product_id: number;
    title: string;
    sku: string;
    stock: number;
    low_stock_threshold: number;
    price: number;
  }>;
  outOfStockList: Array<{
    product_id: number;
    title: string;
    sku: string;
    price: number;
    status: string;
  }>;
  stockHealth: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
  categoryPerformance: Array<{
    category_id: number;
    category_name: string;
    products_count: number;
    total_sold: number;
    revenue: number;
  }>;
}

interface GetProductsReportResponse {
  body: {
    data: ProductsReport;
  };
}

const fetchProductsReport = async (params?: ProductsReportParams): Promise<GetProductsReportResponse> => {
  return await axiosInstance.get('/reports/products', { params });
};

export const useGetProductsReport = (params?: ProductsReportParams) => {
  return useQuery({
    queryKey: ['reports', 'products', params],
    queryFn: () => fetchProductsReport(params),
    staleTime: 60 * 1000,
  });
};
