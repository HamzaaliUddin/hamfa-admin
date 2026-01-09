'use client';

import { VerifyOTP } from '@/app-pages/verify-otp/VerifyOTP';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}

function VerifyOTPContent() {
  return <VerifyOTP />;
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyOTPContent />
    </Suspense>
  );
}
