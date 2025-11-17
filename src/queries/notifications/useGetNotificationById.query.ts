'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Notification } from './useGetNotifications.query';

const fetchNotificationById = async (id: number | string): Promise<Notification> => {
  return await axiosInstance.get(`notifications/${id}`);
};

export const useGetNotificationById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['notification', id],
    queryFn: () => fetchNotificationById(id!),
    enabled: !!id,
  });
};

