'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';

export interface SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

const fetchSeoSettings = async (): Promise<SeoSettings> => {
  return await axiosInstance.get('settings/seo');
};

export const useGetSeoSettings = () => {
  return useQuery({
    queryKey: ['settings', 'seo'],
    queryFn: fetchSeoSettings,
  });
};

