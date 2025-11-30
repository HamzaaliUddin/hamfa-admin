'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Term } from './useGetTerms.query';

export interface CreateTermsInput {
  title: string;
  slug: string;
  content: string;
  version: string;
  status: 'active' | 'draft';
  effective_date: string;
}

interface CreateTermsResponse {
  data: Term;
  message: string;
}

const createTerms = async (data: CreateTermsInput): Promise<Term> => {
  const response: CreateTermsResponse = await axiosInstance.post('/term', data);
  return response.data;
};

export const useCreateTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to create terms';
      toast.error(errorMessage);
    },
  });
};
