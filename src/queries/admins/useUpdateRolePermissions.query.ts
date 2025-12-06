'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { ErrorResponseType } from '@/types/api.types';
import { Permission } from './useGetPermissions.query';

interface UpdateRolePermissionsInput {
  roleId: number;
  permission_ids: number[];
}

interface UpdateRolePermissionsResponse {
  data: Permission[];
}

const updateRolePermissions = async ({
  roleId,
  permission_ids,
}: UpdateRolePermissionsInput): Promise<UpdateRolePermissionsResponse> => {
  return await axiosInstance.put(`/admin/roles/${roleId}/permissions`, {
    permission_ids,
  });
};

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRolePermissions,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      queryClient.invalidateQueries({ queryKey: ['roles', variables.roleId, 'permissions'] });
      toast.success('Permissions updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || error?.data?.error || 'Failed to update permissions');
    },
  });
};

