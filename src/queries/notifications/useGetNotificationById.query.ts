'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Notification } from './useGetNotifications.query';

interface GetNotificationByIdResponse {
  data: Notification;
}

const fetchNotificationById = async (id: number | string): Promise<Notification> => {
  const response: GetNotificationByIdResponse = await axiosInstance.get(`/notification/${id}`);
  return response.data;
};

export const useGetNotificationById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['notification', id],
    queryFn: () => fetchNotificationById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
