import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface Session {
  session_id: number;
  device_name: string;
  device_type: string;
  ip_address?: string;
  last_activity: string;
  created_at: string;
}

export const useGetSessions = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await axiosInstance.get<any, { data: Session[] }>('/auth/sessions');
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
