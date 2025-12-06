'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Permission } from './useGetPermissions.query';

interface GetRolePermissionsResponse {
  data: Permission[];
}

const fetchRolePermissions = async (roleId: number): Promise<GetRolePermissionsResponse> => {
  return await axiosInstance.get(`/admin/roles/${roleId}/permissions`);
};

export const useGetRolePermissions = (roleId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['roles', roleId, 'permissions'],
    queryFn: () => fetchRolePermissions(roleId),
    enabled: enabled && !!roleId,
    staleTime: 60 * 1000,
  });
};

