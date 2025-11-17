'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { PaginationParams, PaginatedResponse } from '@/types/api.types';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'blocked';
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

const fetchUsers = async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
  return await axiosInstance.get('users', { params });
};

export const useGetUsers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  });
};

