'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

export interface Term {
  term_id: number;
  title: string;
  slug: string;
  content: string;
  version: string;
  status: 'active' | 'draft';
  effective_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetTermsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  search?: string;
}

interface GetTermsResponse {
  data: Term[];
  count: number;
}

const fetchTerms = async (params?: GetTermsParams): Promise<GetTermsResponse> => {
  return await axiosInstance.get('/term', { params });
};

export const useGetTerms = (params?: GetTermsParams) => {
  return useQuery({
    queryKey: ['terms', params],
    queryFn: () => fetchTerms(params),
    staleTime: 60 * 1000,
  });
};
