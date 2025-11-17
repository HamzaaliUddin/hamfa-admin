'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  shippingAddress?: any;
  items?: any[];
  createdAt: string;
  updatedAt: string;
}

const fetchOrders = async (params?: PaginationParams): Promise<PaginatedResponse<Order>> => {
  return await axiosInstance.get('orders', { params });
};

export const useGetOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
  });
};

