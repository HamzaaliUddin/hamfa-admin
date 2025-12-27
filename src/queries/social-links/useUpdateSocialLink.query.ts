'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface UpdateSocialLinkInput {
  platform?: string;
  url?: string;
  icon?: string;
  display_order?: number;
  is_active?: boolean;
}

const updateSocialLink = async (id: string, data: UpdateSocialLinkInput): Promise<any> => {
  return await axiosInstance.put(`/social-link/${id}`, data);
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSocialLinkInput }) =>
      updateSocialLink(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social link updated successfully', {
        description: response.message || 'The social link has been updated.',
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.body?.error ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to update social link.';
      toast.error('Update Failed', {
        description: errorMessage,
      });
    },
  });
};

