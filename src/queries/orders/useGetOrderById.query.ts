'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Order } from './useGetOrders.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchOrderById = async (id: number | string): Promise<Order> => {
  const response = await axiosInstance.get(`/order/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetOrderById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
