'use client';

import { FormWrapper } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';
import { VerifyOTPFormData } from './verifyOTP.schema';
import { verifyOTPFormFields } from './VerifyOTPHelper';
import { CardDescription, CardContent, CardTitle } from '@/components/ui/card';

interface VerifyOTPFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<VerifyOTPFormData>;
  isLoading: boolean;
  countdown: number;
  email: string | null;
  canResend: boolean;
  handleResendOTP: () => void;
  isResending: boolean;
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
}: VerifyOTPFormProps) {
  return (
    <FormWrapper onSubmit={onSubmit} asForm>
       <CardContent className="space-y-3 text-center">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification code to
          {email && (
            <span className="mt-1 block font-medium text-foreground">{email}</span>
          )}
        </CardDescription>
      </CardContent>
      {/* OTP Code Field */}
      <div className="space-y-2">
        <Label htmlFor={verifyOTPFormFields.otp_code.id}>
          {verifyOTPFormFields.otp_code.label}
        </Label>
        <Controller
          name={verifyOTPFormFields.otp_code.name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
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
              {error && (
                <div className="text-destructive flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error.message}</p>
                </div>
              )}
            </>
          )}
        />
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
              <p>Didn&apos;t receive the code?</p>
              <p className="mt-1 font-medium">
                Resend available in <span className="text-primary">{countdown}s</span>
              </p>
            </>
          ) : (
            <>
              <p className="mb-2">Didn&apos;t receive the code?</p>
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
    </FormWrapper>
  );
}
