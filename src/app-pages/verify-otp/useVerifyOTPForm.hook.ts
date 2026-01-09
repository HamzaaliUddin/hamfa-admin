'use client';

import { useResendOTP, useVerifyOTP } from '@/queries/auth';
import { ROUTES } from '@/utils/route';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { VerifyOTPFormData } from './verifyOTP.schema';
import { verifyOTPDefaultValues, verifyOTPErrorMessages, verifyOTPValidationRules } from './VerifyOTPHelper';

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
    watch,
    setValue,
  } = useForm<VerifyOTPFormData>({
    defaultValues: verifyOTPDefaultValues,
    mode: 'onBlur',
    resolver: async (data) => {
      const errors: Record<string, any> = {};

      // Validate OTP code
      if (verifyOTPValidationRules.otp_code.required && !data.otp_code) {
        errors.otp_code = {
          type: 'required',
          message:
            typeof verifyOTPValidationRules.otp_code.required === 'string'
              ? verifyOTPValidationRules.otp_code.required
              : 'OTP code is required',
        };
      } else if (verifyOTPValidationRules.otp_code.pattern && data.otp_code) {
        const pattern = verifyOTPValidationRules.otp_code.pattern;
        if (typeof pattern === 'object' && 'value' in pattern) {
          if (!pattern.value.test(data.otp_code)) {
            errors.otp_code = {
              type: 'pattern',
              message: pattern.message || 'Invalid OTP code format',
            };
          }
        }
      }

      return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors,
      };
    },
  });

  const otpValue = watch('otp_code');

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      // Use setTimeout to avoid cascading renders
      const timer = setTimeout(() => setCanResend(true), 0);
      return () => clearTimeout(timer);
    }
  }, [countdown, canResend]);

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
        remember_me: data.remember_me,
      });
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
      setValue('otp_code', '');
      toast.success(verifyOTPErrorMessages.RESEND_SUCCESS);
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  const handleBack = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading: verifyOTPMutation.isPending,
    email,
    countdown,
    canResend,
    handleResendOTP,
    isResending: resendOTPMutation.isPending,
    handleBack,
    otpValue,
  };
}
