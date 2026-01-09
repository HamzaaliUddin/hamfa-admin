'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Social link status enum matching backend
export type SocialLinkStatus = 'active' | 'inactive';

// Social link interface matching backend
export interface SocialLink {
  social_link_id: number;
  platform: string;
  name: string;
  url: string;
  icon?: string;
  order: number;
  status: SocialLinkStatus;
  created_at?: string;
  updated_at?: string;
}

export interface GetSocialLinksParams {
  page?: number;
  limit?: number;
  status?: SocialLinkStatus;
}

interface GetSocialLinksResponse {
  data: SocialLink[];
  count: number;
}

const fetchSocialLinks = async (params?: GetSocialLinksParams): Promise<GetSocialLinksResponse> => {
  return await axiosInstance.get('/social-link', { params });
};

export const useGetSocialLinks = (params?: GetSocialLinksParams) => {
  return useQuery({
    queryKey: ['socialLinks', params],
    queryFn: () => fetchSocialLinks(params),
    staleTime: 60 * 1000,
  });
};
