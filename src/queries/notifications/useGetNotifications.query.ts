'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { NotificationModelType } from '@be-types/notifications/notifications.type';

// Use backend type directly
export type Notification = NotificationModelType;

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  type?: string;
  status?: string;
  search?: string;
}

interface GetNotificationsResponse {
  data: Notification[];
  count: number;
}

const fetchNotifications = async (
  params?: GetNotificationsParams
): Promise<GetNotificationsResponse> => {
  return await axiosInstance.get('/notification', { params });
};

export const useGetNotifications = (params?: GetNotificationsParams) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => fetchNotifications(params),
    staleTime: 60 * 1000,
  });
};
