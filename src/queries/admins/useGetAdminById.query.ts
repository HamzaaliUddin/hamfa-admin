'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Admin } from './useGetAdmins.query';

interface GetAdminByIdResponse {
  data: Admin;
}

const fetchAdminById = async (adminId: number): Promise<GetAdminByIdResponse> => {
  return await axiosInstance.get(`/admin/${adminId}`);
};

export const useGetAdminById = (adminId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['admin', adminId],
    queryFn: () => fetchAdminById(adminId),
    enabled: enabled && !!adminId,
    staleTime: 60 * 1000,
  });
};
