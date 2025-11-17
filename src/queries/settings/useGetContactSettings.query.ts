'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';

export interface ContactSettings {
  email?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  supportEmail?: string;
}

const fetchContactSettings = async (): Promise<ContactSettings> => {
  return await axiosInstance.get('settings/contact');
};

export const useGetContactSettings = () => {
  return useQuery({
    queryKey: ['settings', 'contact'],
    queryFn: fetchContactSettings,
  });
};

