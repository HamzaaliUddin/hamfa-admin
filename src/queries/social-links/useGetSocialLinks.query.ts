'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface SocialLink {
  social_link_id: number;
  platform: string;
  url: string;
  icon?: string;
  display_order?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface GetSocialLinksResponse {
  body: {
    data: SocialLink[];
    count: number;
  };
}

const fetchSocialLinks = async (): Promise<GetSocialLinksResponse> => {
  return await axiosInstance.get('/social-link');
};

export const useGetSocialLinks = () => {
  return useQuery({
    queryKey: ['socialLinks'],
    queryFn: fetchSocialLinks,
    staleTime: 60 * 1000,
  });
};

