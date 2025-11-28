'use client';

import { useResendOTP, useVerifyOTP } from '@/queries/auth';
import { ROUTES } from '@/utils/route';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { VerifyOTPFormData } from './verifyOTP.schema';
import { verifyOTPDefaultValues, verifyOTPErrorMessages } from './VerifyOTPHelper';

export function useVerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const userId = searchParams.get('user_id');
  const email = searchParams.get('email');

  const verifyOTPMutation = useVerifyOTP();
  const resendOTPMutation = useResendOTP();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPFormData>({
    defaultValues: verifyOTPDefaultValues,
    mode: 'onBlur', // Validate on blur for better UX
  });

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Redirect if no user_id
  useEffect(() => {
    if (!userId) {
      toast.error(verifyOTPErrorMessages.MISSING_USER_ID);
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [userId, router]);

  const onSubmit = async (data: VerifyOTPFormData) => {
    if (!userId) return;

    try {
      await verifyOTPMutation.mutateAsync({
        user_id: parseInt(userId),
        otp_code: data.otp_code,
        remember_me: data.remember_me || false,
      });
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  const handleResendOTP = async () => {
    if (!userId || !canResend) return;

    try {
      await resendOTPMutation.mutateAsync({ user_id: parseInt(userId) });
      setCountdown(60);
      setCanResend(false);
      toast.success(verifyOTPErrorMessages.RESEND_SUCCESS);
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: verifyOTPMutation.isPending,
    email,
    countdown,
    canResend,
    handleResendOTP,
    isResending: resendOTPMutation.isPending,
  };
}

