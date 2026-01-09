'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Notification, NotificationActorType, NotificationStatus, NotificationType } from './useGetNotifications.query';

// Create notification input matching backend
export interface CreateNotificationInput {
  title: string;
  message: string;
  description?: string;
  actor_type?: NotificationActorType;
  actor_id?: number;
  actor_name?: string;
  action?: string;
  type: NotificationType;
  status?: NotificationStatus;
}

interface CreateNotificationResponse {
  data: Notification;
}

const createNotification = async (data: CreateNotificationInput): Promise<Notification> => {
  const response: CreateNotificationResponse = await axiosInstance.post('/notification', data);
  return response.data;
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.data?.message || error?.message || 'Failed to create notification';
      toast.error(errorMessage);
    },
  });
};
