'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axiosInstance';
import { User } from './useGetUsers.query';

const fetchUserById = async (id: number | string): Promise<User> => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response.data;
};

export const useGetUserById = (id: number | string | null) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id,
  });
};

