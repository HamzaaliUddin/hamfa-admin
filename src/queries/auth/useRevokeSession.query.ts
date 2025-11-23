import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: number) => {
      const response = await axiosInstance.delete(`/auth/sessions/${sessionId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast.success('Session revoked successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to revoke session';
      toast.error(errorMessage);
    },
  });
};

export const useRevokeAllOtherSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (currentSessionId: number) => {
      const response = await axiosInstance.post('/auth/sessions/revoke-all', {
        current_session_id: currentSessionId,
      });
      return response;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      const count = data?.data?.revokedCount || 0;
      toast.success(`${count} session(s) revoked successfully`);
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to revoke sessions';
      toast.error(errorMessage);
    },
  });
};
