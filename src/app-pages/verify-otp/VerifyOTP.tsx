'use client';

import { VerifyOTPForm } from './VerifyOTPForm';
import { useVerifyOTPForm } from './useVerifyOTPForm.hook';

export function VerifyOTP() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    email,
    countdown,
    canResend,
    handleResendOTP,
    isResending,
  } = useVerifyOTPForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
        <VerifyOTPForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          email={email}
          isLoading={isLoading}
          countdown={countdown}
          canResend={canResend}
          handleResendOTP={handleResendOTP}
          isResending={isResending}
        />
    </div>
  );
}
