'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: 'all' | 'specific';
  recipientIds?: number[];
  sentAt?: string;
  status: 'draft' | 'sent' | 'scheduled';
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

const fetchNotifications = async (params?: PaginationParams): Promise<PaginatedResponse<Notification>> => {
  return await axiosInstance.get('notifications', { params });
};

export const useGetNotifications = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => fetchNotifications(params),
  });
};

