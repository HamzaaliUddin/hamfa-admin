'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteSocialLink = async (id: string): Promise<any> => {
  return await axiosInstance.delete(`/social-link/${id}`);
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social link deleted successfully', {
        description: response.message || 'The social link has been deleted.',
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.body?.error ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to delete social link.';
      toast.error('Deletion Failed', {
        description: errorMessage,
      });
    },
  });
};

