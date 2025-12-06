'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Notification {
  notification_id: number;
  title: string;
  message: string;
  description?: string;
  actor_type?: 'user' | 'super_admin' | 'admin' | 'moderator' | 'system';
  actor_id?: number;
  actor_name?: string;
  action?: string;
  type: 'success' | 'warning' | 'info' | 'error';
  status: 'sent' | 'failed' | 'scheduled';
  read: boolean;
  sent_at?: string;
  created_at?: string;
  updated_at?: string;
}

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
  body: {
    data: Notification[];
    count: number;
  };
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
