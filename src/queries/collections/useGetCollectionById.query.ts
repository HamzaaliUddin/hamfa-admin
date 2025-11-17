'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Collection } from './useGetCollections.query';

const fetchCollectionById = async (id: number | string): Promise<Collection> => {
  return await axiosInstance.get(`collections/${id}`);
};

export const useGetCollectionById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => fetchCollectionById(id!),
    enabled: !!id,
  });
};

