'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from './useGetNotifications.query';
import { CreateNotificationInput } from './useCreateNotification.query';

type UpdateNotificationInput = Partial<CreateNotificationInput>;

interface UpdateNotificationParams {
  id: number | string;
  data: UpdateNotificationInput;
}

interface UpdateNotificationResponse {
  data: Notification;
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
    },
  });
};

