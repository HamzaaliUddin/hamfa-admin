import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

interface VerifyOTPCardProps {
  children: React.ReactNode;
  email: string | null;
}

export function VerifyOTPCard({ children, email }: VerifyOTPCardProps) {
  return (
    <Card className="relative z-10 w-full max-w-md space-y-12 bg-white/70 shadow-2xl">
      <CardHeader className="space-y-3 text-center">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a verification code to
          {email && (
            <span className="mt-1 block font-medium text-foreground">{email}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

