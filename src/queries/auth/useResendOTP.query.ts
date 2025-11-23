import axiosInstance from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ResendOTPRequest {
  user_id: number;
}

export const useResendOTP = () => {
  return useMutation({
    mutationFn: async (data: ResendOTPRequest) => {
      const response = await axiosInstance.post('/auth/resend-otp', data);
      return response;
    },
    onSuccess: () => {
      toast.success('OTP sent successfully! Check your email.');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to resend OTP';
      toast.error(errorMessage);
    },
  });
};
