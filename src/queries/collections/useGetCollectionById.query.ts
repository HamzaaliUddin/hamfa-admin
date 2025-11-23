'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Collection } from './useGetCollections.query';

interface GetCollectionByIdResponse {
  data: Collection;
}

const fetchCollectionById = async (id: number | string): Promise<Collection> => {
  const response: GetCollectionByIdResponse = await axiosInstance.get(`/collection/${id}`);
  return response.data;
};

export const useGetCollectionById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => fetchCollectionById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
