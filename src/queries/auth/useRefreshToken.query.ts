import axiosInstance from '@/api/axios';
import { useMutation } from '@tanstack/react-query';

interface RefreshTokenRequest {
  refresh_token: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (data: RefreshTokenRequest) => {
      const response = await axiosInstance.post<any, { data: RefreshTokenResponse }>(
        '/auth/refresh-token',
        data
      );
      return response.data;
    },
    onSuccess: data => {
      // Update tokens in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_refresh_token', data.refreshToken);

      console.log('✅ Token refreshed successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to refresh token';
      console.error('❌ Token refresh failed:', errorMessage);

      // Clear storage and redirect to login
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    },
  });
};
