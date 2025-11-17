'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Collection } from './useGetCollections.query';

export interface CreateCollectionInput {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status?: 'active' | 'inactive';
  productIds?: number[];
}

const createCollection = async (data: CreateCollectionInput): Promise<Collection> => {
  return await axiosInstance.post('collections', data);
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      toast.success('Collection created successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to create collection');
    },
  });
};

