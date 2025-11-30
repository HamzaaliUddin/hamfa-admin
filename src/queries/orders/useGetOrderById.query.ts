'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Order } from './useGetOrders.query';

interface GetOrderByIdResponse {
  data: Order;
}

const fetchOrderById = async (id: number | string): Promise<Order> => {
  const response: GetOrderByIdResponse = await axiosInstance.get(`/order/${id}`);
  return response.data;
};

export const useGetOrderById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
