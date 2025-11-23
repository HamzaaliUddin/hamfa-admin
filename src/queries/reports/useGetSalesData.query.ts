'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface GetSalesDataParams {
  days?: number;
}

interface GetSalesDataResponse {
  data: SalesData[];
}

const fetchSalesData = async (params?: GetSalesDataParams): Promise<SalesData[]> => {
  const response: GetSalesDataResponse = await axiosInstance.get('/reports/sales', { params });
  return response.data;
};

export const useGetSalesData = (params?: GetSalesDataParams) => {
  return useQuery({
    queryKey: ['sales-data', params],
    queryFn: () => fetchSalesData(params),
    staleTime: 60 * 1000,
  });
};

