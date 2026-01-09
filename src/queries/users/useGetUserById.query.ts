'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';
import { User } from './useGetUsers.query';

// The axios interceptor already unwraps the body, so we get the data directly
const fetchUserById = async (id: number | string): Promise<User> => {
  const response = await axiosInstance.get(`/user/${id}`);
  // axiosInstance already unwraps body, so response contains the data directly
  return response?.data || response;
};

export const useGetUserById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};
