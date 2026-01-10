'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Term } from './useGetTerms.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchTermsById = async (id: number | string): Promise<Term> => {
  const response = await axiosInstance.get(`/term/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetTermsById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['term', id],
    queryFn: () => fetchTermsById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
