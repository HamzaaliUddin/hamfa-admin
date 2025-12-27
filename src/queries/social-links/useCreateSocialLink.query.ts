'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface CreateSocialLinkInput {
  platform: string;
  url: string;
  icon?: string;
  display_order?: number;
  is_active?: boolean;
}

const createSocialLink = async (data: CreateSocialLinkInput): Promise<any> => {
  return await axiosInstance.post('/social-link', data);
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social link created successfully', {
        description: response.message || 'The social link has been created.',
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.body?.error ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to create social link.';
      toast.error('Creation Failed', {
        description: errorMessage,
      });
    },
  });
};

