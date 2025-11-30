'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Notification } from './useGetNotifications.query';

export interface CreateNotificationInput {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'announcement' | 'error';
  recipients: string;
  recipient_ids?: string;
  status: 'sent' | 'failed' | 'scheduled';
  scheduled_for?: string;
}

interface CreateNotificationResponse {
  data: Notification;
  message: string;
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
      const errorMessage = error?.error || error?.message || 'Failed to create notification';
      toast.error(errorMessage);
    },
  });
};

