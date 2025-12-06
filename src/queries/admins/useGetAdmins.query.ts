'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface AdminPermission {
  permission_id: number;
  module: string;
  action: 'view' | 'create' | 'update' | 'delete';
  description: string;
}

export interface AdminRole {
  role_id: number;
  name: string;
  description?: string;
  permissions?: AdminPermission[];
}

export interface Admin {
  user_id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  role?: AdminRole;
}

export interface GetAdminsParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  search?: string;
}

interface GetAdminsResponse {
  data: Admin[];
  count: number;
}

const fetchAdmins = async (params?: GetAdminsParams): Promise<GetAdminsResponse> => {
  return await axiosInstance.get('/admin', { params });
};

export const useGetAdmins = (params?: GetAdminsParams) => {
  return useQuery({
    queryKey: ['admins', params],
    queryFn: () => fetchAdmins(params),
    staleTime: 60 * 1000,
  });
};
