'use client';

import { VerifyOTP } from '@/app-pages/verify-otp/VerifyOTP';
import { Suspense } from 'react';

function VerifyOTPContent() {
  return <VerifyOTP />;
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
