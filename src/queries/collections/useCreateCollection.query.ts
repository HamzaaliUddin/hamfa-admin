'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Collection } from './useGetCollections.query';

export interface CreateCollectionInput {
  title: string;
  slug?: string; // Optional - auto-generated if not provided
  image: string;
  category_id?: number;
  show_in_nav?: boolean;
}

interface CreateCollectionResponse {
  data: Collection;
}

const createCollection = async (data: CreateCollectionInput): Promise<Collection> => {
  const response: CreateCollectionResponse = await axiosInstance.post('/collection', data);
  return response.data;
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast.success('Collection created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.data?.message || error?.message || 'Failed to create collection';
      toast.error(errorMessage);
    },
  });
};
