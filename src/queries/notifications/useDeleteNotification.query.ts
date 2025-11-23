'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteNotificationResponse {
  message: string;
}

const deleteNotification = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteNotificationResponse>(`/notification/${id}`);
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete notification';
      toast.error(errorMessage);
    },
  });
};
