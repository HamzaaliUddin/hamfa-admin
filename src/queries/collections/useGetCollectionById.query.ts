'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Collection } from './useGetCollections.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchCollectionById = async (id: number | string): Promise<Collection> => {
  const response = await axiosInstance.get(`/collection/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetCollectionById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => fetchCollectionById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
