'use client';

import { OTPInput } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';
import { VerifyOTPFormData } from './verifyOTP.schema';
import { otpConfig, otpMessages, verifyOTPFormFields } from './VerifyOTPHelper';

interface VerifyOTPFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<VerifyOTPFormData>;
  isLoading: boolean;
  countdown: number;
  email: string | null;
  canResend: boolean;
  handleResendOTP: () => void;
  isResending: boolean;
  onBack?: () => void;
  otpValue: string;
}

export function VerifyOTPForm({
  onSubmit,
  control,
  isLoading,
  countdown,
  email,
  canResend,
  handleResendOTP,
  isResending,
  onBack,
  otpValue,
}: VerifyOTPFormProps) {
  const isOTPComplete = otpValue.length === otpConfig.otpLength;

  return (
    <div className="flex-1 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <Card className="w-full max-w-md p-4 sm:p-6 md:p-8 shadow-lg border-border">
        {/* Back Button */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Back to login</span>
          </button>
        )}

        {/* Title Section */}
        <div className="text-center mb-2">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-4">
            <Mail className="text-primary h-8 w-8" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Verify Your Code
          </h1>
          <p className="text-muted-foreground mt-1.5 sm:mt-2 mb-2 text-xs sm:text-sm md:text-base">
            We&apos;ve sent a {otpConfig.otpLength}-digit verification code to your email.
          </p>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            <span className="text-foreground font-medium break-all">
              {email || otpConfig.email}
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 sm:mt-2">
            Enter the code below to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* OTP Input */}
          <Controller
            name={verifyOTPFormFields.otp_code.name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-2">
                <OTPInput
                  length={otpConfig.otpLength}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  error={!!error}
                />
                {error && (
                  <p className="text-center text-sm text-destructive">{error.message}</p>
                )}
              </div>
            )}
          />

          {/* Resend Button */}
          <div className="text-center mt-4">
            {!canResend ? (
              <p className="text-xs sm:text-sm text-muted-foreground">
                Resend available in{' '}
                <span className="text-primary font-medium">{countdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading || isResending}
                className="text-xs sm:text-sm font-semibold text-foreground hover:underline disabled:opacity-50"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Controller
              name={verifyOTPFormFields.remember_me.name}
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <Checkbox
                  {...field}
                  id={verifyOTPFormFields.remember_me.id}
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <label
              htmlFor={verifyOTPFormFields.remember_me.id}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {verifyOTPFormFields.remember_me.label}
            </label>
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            variant="default"
            disabled={!isOTPComplete || isLoading}
            className="w-full h-9 sm:h-10 md:h-11 text-sm sm:text-base mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                {otpMessages.loading}
              </>
            ) : (
              otpMessages.submit
            )}
          </Button>
        </form>

        {/* Didn't receive code */}
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Didn&apos;t receive it?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading || isResending || !canResend}
              className="font-semibold text-foreground hover:underline disabled:opacity-50"
            >
              Send again
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
