import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface CurrentUserResponse {
  user_id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  role: {
    role_id: number;
    name: string;
    permissions?: Array<{
      permission_id: number;
      module: string;
      action: string;
      description: string;
    }>;
  };
  brand?: {
    brand_id: number;
    name: string;
  };
}

export const useGetCurrentUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosInstance.get<any, { data: CurrentUserResponse }>('/auth/me');
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
