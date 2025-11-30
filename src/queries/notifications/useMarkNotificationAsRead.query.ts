'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Notification } from './useGetNotifications.query';

interface MarkAsReadResponse {
  data: Notification;
  message: string;
}

const markAsRead = async (id: number | string): Promise<Notification> => {
  const response: MarkAsReadResponse = await axiosInstance.patch(`/notification/${id}/read`);
  return response.data;
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notification', id] });
      toast.success('Notification marked as read');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to mark as read';
      toast.error(errorMessage);
    },
  });
};

