'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from './useGetNotifications.query';
import { NotificationModelType } from '@be-types/notifications/notifications.type';

// Use backend type for creating notifications
export interface CreateNotificationInput {
  title: string;
  message: string;
  type: NotificationModelType['type'];
  status: NotificationModelType['status'];
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
    },
  });
};

