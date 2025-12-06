'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Collection } from './useGetCollections.query';

export interface CreateCollectionInput {
  name: string;
  slug: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  featured?: boolean;
  sort_order: number;
}

interface CreateCollectionResponse {
  body: {
  data: Collection;
  };
  message: string;
}

const createCollection = async (data: CreateCollectionInput): Promise<Collection> => {
  const response: CreateCollectionResponse = await axiosInstance.post('/collection', data);
  return response.body.data;
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to create collection';
      toast.error(errorMessage);
    },
  });
};
