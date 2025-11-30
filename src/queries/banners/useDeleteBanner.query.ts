'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteBannerResponse {
  message: string;
}

const deleteBanner = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteBannerResponse>(`/banner/${id}`);
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete banner';
      toast.error(errorMessage);
    },
  });
};
