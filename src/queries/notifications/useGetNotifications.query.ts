'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Notification {
  notification_id: number;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'announcement' | 'error';
  recipients: string;
  recipient_ids?: string;
  status: 'sent' | 'failed' | 'scheduled';
  read: boolean;
  click_count: number;
  sent_at?: string;
  scheduled_for?: string;
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
