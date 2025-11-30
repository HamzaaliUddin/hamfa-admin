'use client';

import { useLogin } from '@/queries/auth';
import { NavigationHelper } from '@/utils/route';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoginFormData } from './login.schema';
import { loginDefaultValues, loginErrorMessages } from './LoginHelper';

export function useLoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: loginDefaultValues,
    mode: 'onBlur', // Validate on blur for better UX
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation.mutateAsync(data);
      console.log('Login result:', result);

      // Check multiple possible response structures
      const user_id = result?.body?.data?.user_id || result?.data?.user_id;
      const email = result?.body?.data?.email || result?.data?.email;

      // Check if we have the required data
      if (user_id && email) {
        // Redirect to OTP verification page with user_id and email
        const otpRoute = NavigationHelper.toVerifyOTP(user_id, email);
        router.push(otpRoute);
      } else {
        console.error('Missing user_id or email in response:', result);
        toast.error(loginErrorMessages.MISSING_DATA);
      }
    } catch (error) {
      // Error already handled by the mutation
      console.error('Login error:', error);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
