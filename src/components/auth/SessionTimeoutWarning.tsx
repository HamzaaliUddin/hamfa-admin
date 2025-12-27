'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRefreshToken } from '@/queries/auth/useRefreshToken.query';
import { authUtils } from '@/utils/auth';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SessionTimeoutWarningProps {
  warningTime?: number; // Minutes before expiry to show warning (default: 5)
  tokenExpiresIn?: string; // Token expiry duration (e.g., "7d", "30d")
}

export function SessionTimeoutWarning({
  warningTime = 5,
  tokenExpiresIn = '7d',
}: SessionTimeoutWarningProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const refreshTokenMutation = useRefreshToken();

  useEffect(() => {
    // Parse token expiry
    const expiryMs = parseExpiryTime(tokenExpiresIn);
    if (!expiryMs) return;

    // Calculate warning time
    const warningMs = warningTime * 60 * 1000;
    const timeUntilWarning = expiryMs - warningMs;

    // Set timer to show warning
    const warningTimer = setTimeout(() => {
      setShowWarning(true);
      setTimeLeft(warningTime * 60); // seconds
    }, timeUntilWarning);

    return () => clearTimeout(warningTimer);
  }, [tokenExpiresIn, warningTime]);

  // Countdown timer
  useEffect(() => {
    if (!showWarning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto logout
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showWarning, timeLeft]);

  const handleExtendSession = async () => {
    const refreshToken = localStorage.getItem('admin_refresh_token');
    if (!refreshToken) {
      handleLogout();
      return;
    }

    try {
      await refreshTokenMutation.mutateAsync({ refresh_token: refreshToken });
      setShowWarning(false);
      setTimeLeft(0);
    } catch (error) {
      console.error('Failed to extend session:', error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    authUtils.logout();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <DialogTitle className="text-center">Session Expiring Soon</DialogTitle>
          <DialogDescription className="text-center">
            Your session will expire in <strong className="text-lg">{formatTime(timeLeft)}</strong>
            <br />
            Would you like to extend your session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={refreshTokenMutation.isPending}
          >
            Logout
          </Button>
          <Button onClick={handleExtendSession} disabled={refreshTokenMutation.isPending}>
            {refreshTokenMutation.isPending ? 'Extending...' : 'Extend Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to parse expiry time
function parseExpiryTime(expiresIn: string): number | null {
  const match = expiresIn.match(/^(\d+)([dhms])$/);
  if (!match) return null;

  const [, value, unit] = match;
  const num = parseInt(value, 10);

  switch (unit) {
    case 'd':
      return num * 24 * 60 * 60 * 1000;
    case 'h':
      return num * 60 * 60 * 1000;
    case 'm':
      return num * 60 * 1000;
    case 's':
      return num * 1000;
    default:
      return null;
  }
}
