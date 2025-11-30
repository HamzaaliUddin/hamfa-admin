'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface User {
  user_id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  role?: {
    role_id: number;
    name: string;
  };
  brand?: {
    brand_id: number;
    name: string;
  };
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  role?: string;
  search?: string;
}

interface GetUsersResponse {
  data: User[];
  count: number;
}

const fetchUsers = async (params?: GetUsersParams): Promise<GetUsersResponse> => {
  return await axiosInstance.get('/user', { params });
};

export const useGetUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    staleTime: 60 * 1000, // 1 minute
  });
};
