'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Term } from './useGetTerms.query';
import { CreateTermsInput } from './useCreateTerms.query';

type UpdateTermsInput = Partial<CreateTermsInput>;

interface UpdateTermsParams {
  id: number | string;
  data: UpdateTermsInput;
}

interface UpdateTermsResponse {
  data: Term;
  message: string;
}

const updateTerms = async ({ id, data }: UpdateTermsParams): Promise<Term> => {
  const response: UpdateTermsResponse = await axiosInstance.put(`/term/${id}`, data);
  return response.data;
};

export const useUpdateTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTerms,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      queryClient.invalidateQueries({ queryKey: ['term', variables.id] });
      toast.success('Terms updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update terms';
      toast.error(errorMessage);
    },
  });
};
