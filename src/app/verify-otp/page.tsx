'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResendOTP, useVerifyOTP } from '@/queries/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import bg from '../../../public/logo/bg.png';

const otpSchema = z.object({
  otp_code: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
  remember_me: z.boolean().optional(),
});

type OTPFormData = z.infer<typeof otpSchema>;

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const userId = searchParams.get('user_id');
  const email = searchParams.get('email');

  const verifyOTPMutation = useVerifyOTP();
  const resendOTPMutation = useResendOTP();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      remember_me: false,
    },
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
      router.push('/login');
    }
  }, [userId, router]);

  const onSubmit = async (data: OTPFormData) => {
    if (!userId) return;

    try {
      await verifyOTPMutation.mutateAsync({
        user_id: parseInt(userId),
        otp_code: data.otp_code,
        remember_me: data.remember_me || false,
      });
      router.push('/dashboard');
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
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* OTP Card */}
      <Card className="relative z-10 w-full max-w-md bg-white/70 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          {/* Hamfa Logo */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a 6-digit code to <strong>{email || 'your email'}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp_code">Enter OTP Code</Label>
              <Input
                id="otp_code"
                type="text"
                placeholder="000000"
                maxLength={6}
                className="text-center text-2xl tracking-widest"
                {...register('otp_code')}
                disabled={verifyOTPMutation.isPending}
                autoFocus
              />
              {errors.otp_code && (
                <div className="text-destructive flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <p>{errors.otp_code.message}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember_me" {...register('remember_me')} />
              <label
                htmlFor="remember_me"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={verifyOTPMutation.isPending}>
              {verifyOTPMutation.isPending ? (
                'Verifying...'
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify & Continue
                </>
              )}
            </Button>

            <div className="text-center">
              {canResend ? (
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendOTP}
                  disabled={resendOTPMutation.isPending}
                  className="text-sm"
                >
                  {resendOTPMutation.isPending ? 'Sending...' : 'Resend OTP'}
                </Button>
              ) : (
                <p className="text-muted-foreground text-sm">Resend OTP in {countdown}s</p>
              )}
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                <strong>Tip:</strong> Check your spam folder if you don't see the email. The OTP is
                valid for 10 minutes.
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => router.push('/login')}
            >
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
