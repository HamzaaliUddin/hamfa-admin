'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Setting {
  setting_id: number;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  category: 'general' | 'email' | 'payment' | 'shipping' | 'security' | 'appearance';
  description?: string;
  is_public: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetSettingsParams {
  category?: string;
}

interface GetSettingsResponse {
  data: Setting[];
}

const fetchSettings = async (params?: GetSettingsParams): Promise<Setting[]> => {
  const response: GetSettingsResponse = await axiosInstance.get('/setting', { params });
  return response.data;
};

export const useGetSettings = (params?: GetSettingsParams) => {
  return useQuery({
    queryKey: ['settings', params],
    queryFn: () => fetchSettings(params),
    staleTime: 300 * 1000, // 5 minutes
  });
};
