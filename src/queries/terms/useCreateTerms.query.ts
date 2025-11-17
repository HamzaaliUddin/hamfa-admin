'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Terms } from './useGetTerms.query';

export interface CreateTermsInput {
  title: string;
  slug: string;
  content: string;
  type?: Terms['type'];
  status?: 'active' | 'inactive';
  version?: string;
}

const createTerms = async (data: CreateTermsInput): Promise<Terms> => {
  return await axiosInstance.post('terms', data);
};

export const useCreateTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms created successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to create terms');
    },
  });
};

