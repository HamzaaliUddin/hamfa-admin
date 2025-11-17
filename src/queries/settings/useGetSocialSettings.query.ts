'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';

export interface SocialSettings {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  pinterest?: string;
  tiktok?: string;
}

const fetchSocialSettings = async (): Promise<SocialSettings> => {
  return await axiosInstance.get('settings/social');
};

export const useGetSocialSettings = () => {
  return useQuery({
    queryKey: ['settings', 'social'],
    queryFn: fetchSocialSettings,
  });
};

