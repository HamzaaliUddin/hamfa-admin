'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteCollectionResponse {
  message: string;
}

const deleteCollection = async (id: number | string): Promise<void> => {
  await axiosInstance.delete<DeleteCollectionResponse>(`/collection/${id}`);
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast.success('Collection deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to delete collection';
      toast.error(errorMessage);
    },
  });
};
