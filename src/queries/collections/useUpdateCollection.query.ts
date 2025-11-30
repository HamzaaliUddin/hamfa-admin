'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Collection } from './useGetCollections.query';
import { CreateCollectionInput } from './useCreateCollection.query';

type UpdateCollectionInput = Partial<CreateCollectionInput>;

interface UpdateCollectionParams {
  id: number | string;
  data: UpdateCollectionInput;
}

interface UpdateCollectionResponse {
  data: Collection;
  message: string;
}

const updateCollection = async ({ id, data }: UpdateCollectionParams): Promise<Collection> => {
  const response: UpdateCollectionResponse = await axiosInstance.put(`/collection/${id}`, data);
  return response.data;
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
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update collection';
      toast.error(errorMessage);
    },
  });
};
