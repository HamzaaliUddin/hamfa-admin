'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
}: OTPInputProps) {
  const [otp, setOtp] = React.useState<string[]>(Array(length).fill(''));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      const paddedArray = [...otpArray, ...Array(length - otpArray.length).fill('')];
      setOtp(paddedArray);
    } else {
      setOtp(Array(length).fill(''));
    }
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    // Only allow digits
    if (digit && !/^\d$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    if (digits) {
      const newOtp = digits.split('').concat(Array(length - digits.length).fill(''));
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus last filled input or last input
      const focusIndex = Math.min(digits.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={cn(
            'w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-destructive focus:border-destructive focus:ring-destructive'
              : 'border-border focus:border-primary focus:ring-primary',
            'bg-background text-foreground'
          )}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}

