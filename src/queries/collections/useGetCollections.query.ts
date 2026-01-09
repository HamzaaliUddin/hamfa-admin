'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Collection interface matching backend
export interface Collection {
  collection_id: number;
  title: string;
  slug: string;
  image: string;
  category_id?: number;
  show_in_nav?: boolean;
  created_at?: string;
  updated_at?: string;
  // Joined data (optional)
  category?: {
    category_id: number;
    name: string;
  };
  products_count?: number;
}

export interface GetCollectionsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  category_id?: number;
  show_in_nav?: boolean;
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
