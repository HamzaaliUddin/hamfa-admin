'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Notification } from './useGetNotifications.query';
import { CreateNotificationInput } from './useCreateNotification.query';

type UpdateNotificationInput = Partial<CreateNotificationInput>;

interface UpdateNotificationParams {
  id: number | string;
  data: UpdateNotificationInput;
}

interface UpdateNotificationResponse {
  data: Notification;
  message: string;
}

const updateNotification = async ({ id, data }: UpdateNotificationParams): Promise<Notification> => {
  const response: UpdateNotificationResponse = await axiosInstance.put(`/notification/${id}`, data);
  return response.data;
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotification,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notification', variables.id] });
      toast.success('Notification updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update notification';
      toast.error(errorMessage);
    },
  });
};

