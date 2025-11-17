'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Order } from './useGetOrders.query';

const fetchOrderById = async (id: number | string): Promise<Order> => {
  return await axiosInstance.get(`orders/${id}`);
};

export const useGetOrderById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
  });
};

