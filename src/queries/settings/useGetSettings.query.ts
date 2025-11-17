'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';

export interface Settings {
  id: number;
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  currency?: string;
  language?: string;
  timezone?: string;
  logo?: string;
  favicon?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
  payment?: {
    stripePublicKey?: string;
    paypalClientId?: string;
  };
  email?: {
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    fromEmail?: string;
    fromName?: string;
  };
  createdAt: string;
  updatedAt: string;
}

const fetchSettings = async (): Promise<Settings> => {
  return await axiosInstance.get('settings');
};

export const useGetSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });
};

