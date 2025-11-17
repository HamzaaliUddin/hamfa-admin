'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { Terms } from './useGetTerms.query';

const fetchTermsById = async (id: number | string): Promise<Terms> => {
  return await axiosInstance.get(`terms/${id}`);
};

export const useGetTermsById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['terms', id],
    queryFn: () => fetchTermsById(id!),
    enabled: !!id,
  });
};

