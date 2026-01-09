'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Notification actor type enum matching backend
export type NotificationActorType = 'user' | 'super_admin' | 'admin' | 'moderator' | 'system';

// Notification type enum matching backend
export type NotificationType = 'success' | 'warning' | 'info' | 'announcement' | 'error';

// Notification status enum matching backend
export type NotificationStatus = 'sent' | 'failed' | 'scheduled';

// Notification interface matching backend
export interface Notification {
  notification_id: number;
  title: string;
  message: string;
  description?: string;
  actor_type?: NotificationActorType;
  actor_id?: number;
  actor_name?: string;
  action?: string;
  type: NotificationType;
  status: NotificationStatus;
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
  type?: NotificationType;
  status?: NotificationStatus;
  read?: boolean;
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
