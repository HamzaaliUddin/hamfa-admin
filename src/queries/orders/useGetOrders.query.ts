'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Order {
  order_id: number;
  order_number: string;
  user_id: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'card' | 'paypal' | 'cod';
  payment_status: 'paid' | 'pending' | 'failed';
  shipping_address: any;
  billing_address: any;
  tracking_number?: string;
  notes?: string;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  payment_status?: string;
  search?: string;
}

interface GetOrdersResponse {
  data: Order[];
  count: number;
}

const fetchOrders = async (params?: GetOrdersParams): Promise<GetOrdersResponse> => {
  return await axiosInstance.get('/order', { params });
};

export const useGetOrders = (params?: GetOrdersParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    staleTime: 60 * 1000,
  });
};
