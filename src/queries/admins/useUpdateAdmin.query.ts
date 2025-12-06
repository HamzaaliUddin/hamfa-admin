'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { ErrorResponseType } from '@/types/api.types';
import { Admin } from './useGetAdmins.query';

export interface UpdateAdminInput {
  name?: string;
  email?: string;
  password?: string;
  role_id?: number;
  is_active?: boolean;
}

const updateAdmin = async ({
  adminId,
  data,
}: {
  adminId: number;
  data: UpdateAdminInput;
}): Promise<Admin> => {
  return await axiosInstance.put(`/admin/${adminId}`, data);
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      queryClient.invalidateQueries({ queryKey: ['admin', variables.adminId] });
      toast.success('Admin updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || error?.data?.error || 'Failed to update admin');
    },
  });
};
