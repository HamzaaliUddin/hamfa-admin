'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Permission {
  permission_id: number;
  module: string;
  action: 'view' | 'create' | 'update' | 'delete';
  description: string;
}

export interface GroupedPermission {
  module: string;
  permissions: Permission[];
}

interface GetPermissionsResponse {
  data: Permission[];
}

interface GetGroupedPermissionsResponse {
  data: GroupedPermission[];
}

const fetchPermissions = async (): Promise<GetPermissionsResponse> => {
  return await axiosInstance.get('/admin/permissions');
};

const fetchGroupedPermissions = async (): Promise<GetGroupedPermissionsResponse> => {
  return await axiosInstance.get('/admin/permissions/grouped');
};

export const useGetPermissions = () => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetGroupedPermissions = () => {
  return useQuery({
    queryKey: ['permissions', 'grouped'],
    queryFn: fetchGroupedPermissions,
    staleTime: 5 * 60 * 1000,
  });
};

