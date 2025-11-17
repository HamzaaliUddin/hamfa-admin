'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Terms } from './useGetTerms.query';
import { CreateTermsInput } from './useCreateTerms.query';

type UpdateTermsInput = Partial<CreateTermsInput>;

interface UpdateTermsParams {
  id: number | string;
  data: UpdateTermsInput;
}

const updateTerms = async ({ id, data }: UpdateTermsParams): Promise<Terms> => {
  return await axiosInstance.put(`terms/${id}`, data);
};

export const useUpdateTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTerms,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      queryClient.invalidateQueries({ queryKey: ['terms', variables.id] });
      toast.success('Terms updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update terms');
    },
  });
};

