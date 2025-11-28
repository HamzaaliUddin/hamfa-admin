'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { VerifyOTPFormData } from './verifyOTP.schema';
import { verifyOTPFormFields, verifyOTPValidationRules } from './VerifyOTPHelper';

interface VerifyOTPFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<VerifyOTPFormData>;
  errors: FieldErrors<VerifyOTPFormData>;
  isLoading: boolean;
  countdown: number;
  canResend: boolean;
  handleResendOTP: () => void;
  isResending: boolean;
}

export function VerifyOTPForm({
  onSubmit,
  control,
  errors,
  isLoading,
  countdown,
  canResend,
  handleResendOTP,
  isResending,
}: VerifyOTPFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* OTP Code Field */}
      <div className="space-y-2">
        <Label htmlFor={verifyOTPFormFields.otp_code.id}>
          {verifyOTPFormFields.otp_code.label}
        </Label>
        <Controller
          name={verifyOTPFormFields.otp_code.name}
          control={control}
          rules={verifyOTPValidationRules.otp_code}
          render={({ field }) => (
            <Input
              {...field}
              id={verifyOTPFormFields.otp_code.id}
              type={verifyOTPFormFields.otp_code.type}
              placeholder={verifyOTPFormFields.otp_code.placeholder}
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              disabled={isLoading}
              autoFocus
            />
          )}
        />
        {errors.otp_code && (
          <div className="text-destructive flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" />
            <p>{errors.otp_code.message}</p>
          </div>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center space-x-2">
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

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          'Verifying...'
        ) : (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Verify & Continue
          </>
        )}
      </Button>

      {/* Resend OTP Section */}
      <div className="text-center">
        <div className="text-muted-foreground text-sm">
          {!canResend ? (
            <>
              <p>Didn't receive the code?</p>
              <p className="mt-1 font-medium">
                Resend available in <span className="text-primary">{countdown}s</span>
              </p>
            </>
          ) : (
            <>
              <p className="mb-2">Didn't receive the code?</p>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  'Sending...'
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend OTP
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

