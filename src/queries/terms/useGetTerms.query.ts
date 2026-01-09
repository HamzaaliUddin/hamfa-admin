'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Term type enum matching backend
export type TermType = 'terms' | 'privacy' | 'refund' | 'shipping';

// Term status enum matching backend
export type TermStatus = 'active' | 'inactive' | 'draft';

// Term interface matching backend
export interface Term {
  term_id: number;
  title: string;
  type: TermType;
  description: string;
  content: string;
  version: string;
  status: TermStatus;
  effective_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetTermsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  type?: TermType;
  status?: TermStatus;
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
