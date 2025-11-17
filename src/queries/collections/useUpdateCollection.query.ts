'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Collection } from './useGetCollections.query';
import { CreateCollectionInput } from './useCreateCollection.query';

type UpdateCollectionInput = Partial<CreateCollectionInput>;

interface UpdateCollectionParams {
  id: number | string;
  data: UpdateCollectionInput;
}

const updateCollection = async ({ id, data }: UpdateCollectionParams): Promise<Collection> => {
  return await axiosInstance.put(`collections/${id}`, data);
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCollection,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection', variables.id] });
      toast.success('Collection updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update collection');
    },
  });
};

