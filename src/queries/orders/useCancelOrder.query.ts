'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Order } from './useGetOrders.query';

interface CancelOrderResponse {
  data: Order;
  message: string;
}

const cancelOrder = async (id: number | string): Promise<Order> => {
  const response: CancelOrderResponse = await axiosInstance.put(`/order/${id}`, {
    status: 'cancelled',
  });
  return response.data;
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      toast.success('Order cancelled successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to cancel order';
      toast.error(errorMessage);
    },
  });
};
