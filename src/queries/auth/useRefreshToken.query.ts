import axiosInstance from '@/services/axiosInstance';
import { authUtils } from '@/utils/auth';
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
      // Update token in cookies using authUtils
      authUtils.setToken(data.token);
      
      // Store refresh token in localStorage (if needed)
      localStorage.setItem('admin_refresh_token', data.refreshToken);

      console.log('✅ Token refreshed successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to refresh token';
      console.error('❌ Token refresh failed:', errorMessage);

      // Use authUtils to handle logout properly
      authUtils.logout();
    },
  });
};
