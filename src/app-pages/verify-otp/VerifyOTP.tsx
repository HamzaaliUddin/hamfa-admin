'use client';

import { VerifyOTPBackgroundImage } from './VerifyOTPBackgroundImage';
import { VerifyOTPCard } from './VerifyOTPCard';
import { VerifyOTPForm } from './VerifyOTPForm';
import { useVerifyOTPForm } from './useVerifyOTPForm.hook';

export function VerifyOTP() {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    email,
    countdown,
    canResend,
    handleResendOTP,
    isResending,
  } = useVerifyOTPForm();

  return (
    <VerifyOTPBackgroundImage>
      <VerifyOTPCard email={email}>
        <VerifyOTPForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          isLoading={isLoading}
          countdown={countdown}
          canResend={canResend}
          handleResendOTP={handleResendOTP}
          isResending={isResending}
        />
      </VerifyOTPCard>
    </VerifyOTPBackgroundImage>
  );
}

