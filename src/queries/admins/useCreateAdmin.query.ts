'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { ErrorResponseType } from '@/types/api.types';
import { Admin } from './useGetAdmins.query';

export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  role_id: number;
  is_active?: boolean;
}

const createAdmin = async (data: CreateAdminInput): Promise<Admin> => {
  return await axiosInstance.post('/admin', data);
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Admin created successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || error?.data?.error || 'Failed to create admin');
    },
  });
};
