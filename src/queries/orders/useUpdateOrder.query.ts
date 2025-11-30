'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Order } from './useGetOrders.query';

export interface UpdateOrderInput {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status?: 'paid' | 'pending' | 'failed';
  tracking_number?: string;
  notes?: string;
}

interface UpdateOrderParams {
  id: number | string;
  data: UpdateOrderInput;
}

interface UpdateOrderResponse {
  data: Order;
  message: string;
}

const updateOrder = async ({ id, data }: UpdateOrderParams): Promise<Order> => {
  const response: UpdateOrderResponse = await axiosInstance.put(`/order/${id}`, data);
  return response.data;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
      toast.success('Order updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update order';
      toast.error(errorMessage);
    },
  });
};
