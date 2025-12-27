'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Collection {
  collection_id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  categories_count: number;
  status: 'active' | 'inactive';
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetCollectionsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  featured?: boolean;
  search?: string;
}

interface GetCollectionsResponse {
  data: Collection[];
  count: number;
}

const fetchCollections = async (params?: GetCollectionsParams): Promise<GetCollectionsResponse> => {
  return await axiosInstance.get('/collection', { params });
};

export const useGetCollections = (params?: GetCollectionsParams) => {
  return useQuery({
    queryKey: ['collections', params],
    queryFn: () => fetchCollections(params),
    staleTime: 60 * 1000,
  });
};
