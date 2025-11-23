'use client';

import axiosInstance from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import { Term } from './useGetTerms.query';

interface GetTermsByIdResponse {
  data: Term;
}

const fetchTermsById = async (id: number | string): Promise<Term> => {
  const response: GetTermsByIdResponse = await axiosInstance.get(`/term/${id}`);
  return response.data;
};

export const useGetTermsById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['term', id],
    queryFn: () => fetchTermsById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
