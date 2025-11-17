'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Notification } from './useGetNotifications.query';

export interface SendNotificationInput {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  targetAudience?: 'all' | 'specific';
  recipientIds?: number[];
  scheduledAt?: string;
}

const sendNotification = async (data: SendNotificationInput): Promise<Notification> => {
  return await axiosInstance.post('notifications/send', data);
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification sent successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to send notification');
    },
  });
};

