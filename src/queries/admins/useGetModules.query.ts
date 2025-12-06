'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface ModuleType {
  module: string;
  name: string;
  description: string;
  availablePermissions: string[];
}

interface GetModulesResponse {
  data: ModuleType[];
}

const fetchModules = async (): Promise<GetModulesResponse> => {
  return await axiosInstance.get('/admin/modules');
};

export const useGetModules = () => {
  return useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

