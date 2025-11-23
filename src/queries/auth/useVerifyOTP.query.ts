import axiosInstance from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface VerifyOTPRequest {
  user_id: number;
  otp_code: string;
  remember_me?: boolean;
}

interface VerifyOTPResponse {
  user: {
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
    brand?: {
      brand_id: number;
      name: string;
    };
  };
  token: string;
  refreshToken: string;
  expiresIn: string;
}

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (data: VerifyOTPRequest) => {
      const response = await axiosInstance.post<any, { data: VerifyOTPResponse }>(
        '/auth/verify-otp',
        data
      );
      return response.data;
    },
    onSuccess: data => {
      // Store tokens and user in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_refresh_token', data.refreshToken);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      localStorage.setItem('token_expires_in', data.expiresIn);
      
      // Also set token in cookie for middleware validation
      document.cookie = `admin_token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

      console.log('✅ Authentication successful! Token stored in localStorage and cookie');
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Invalid or expired OTP';
      toast.error(errorMessage);
    },
  });
};
