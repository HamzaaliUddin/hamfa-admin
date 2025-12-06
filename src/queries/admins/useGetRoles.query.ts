'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Role {
  role_id: number;
  name: string;
  description: string;
}

interface GetRolesResponse {
  data: Role[];
}

const fetchRoles = async (): Promise<GetRolesResponse> => {
  return await axiosInstance.get('/admin/roles');
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

