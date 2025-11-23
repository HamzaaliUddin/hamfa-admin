'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Setting } from './useGetSettings.query';

interface GetSettingByKeyResponse {
  data: Setting;
}

const fetchSettingByKey = async (key: string): Promise<Setting> => {
  const response: GetSettingByKeyResponse = await axiosInstance.get(`/setting/key/${key}`);
  return response.data;
};

export const useGetSettingByKey = (key: string | null) => {
  return useQuery({
    queryKey: ['setting', key],
    queryFn: () => fetchSettingByKey(key!),
    enabled: !!key,
    staleTime: 300 * 1000,
  });
};

