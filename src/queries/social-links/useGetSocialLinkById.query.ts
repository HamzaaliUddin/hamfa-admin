'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { SocialLink } from './useGetSocialLinks.query';

interface GetSocialLinkByIdResponse {
  body: {
    data: SocialLink;
  };
}

const fetchSocialLinkById = async (id: string): Promise<GetSocialLinkByIdResponse> => {
  return await axiosInstance.get(`/social-link/${id}`);
};

export const useGetSocialLinkById = (id: string) => {
  return useQuery({
    queryKey: ['socialLinks', id],
    queryFn: () => fetchSocialLinkById(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};

