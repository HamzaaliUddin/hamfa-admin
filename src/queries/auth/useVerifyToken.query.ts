import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface VerifyTokenResponse {
  valid: boolean;
  user?: {
    user_id: number;
    name: string;
    email: string;
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
  };
}

export const useVerifyToken = (token?: string) => {
  return useQuery({
    queryKey: ['verify-token', token],
    queryFn: async () => {
      const response = await axiosInstance.get<any, { data: VerifyTokenResponse }>('/auth/verify');
      return response.data;
    },
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
