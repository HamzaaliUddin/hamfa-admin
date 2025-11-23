'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/queries/auth';
import { authUtils } from '@/utils/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import bg from '../../../public/logo/bg.png';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [isChecking, setIsChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingAuth = () => {
      const token = authUtils.getToken();
      const user = authUtils.getUser();

      if (token && user) {
        console.log('✅ Token found in cache, redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        setIsChecking(false);
      }
    };

    checkExistingAuth();
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation.mutateAsync(data);
      console.log('✅ Login result:', result);

      // Check if we have the required data
      if (result?.user_id && result?.email) {
        // Redirect to OTP verification page with user_id and email
        router.push(
          `/verify-otp?user_id=${result.user_id}&email=${encodeURIComponent(result.email)}`
        );
      } else {
        console.error('❌ Missing user_id or email in response:', result);
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      // Error already handled by the mutation
      console.error('❌ Login error:', error);
    }
  };

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center to-blue-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
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
      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md space-y-12 bg-white/70 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          {/* Hamfa Logo */}
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hamfa.com"
                {...register('email')}
                disabled={loginMutation.isPending}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={loginMutation.isPending}
              />
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Use: admin@hamfa.com / Admin@123!
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
