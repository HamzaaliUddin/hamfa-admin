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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: loginDefaultValues,
    mode: 'onBlur', // Validate on blur for better UX
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation.mutateAsync(data);
      console.log('✅ Login result:', result);

      // Check if we have the required data
      if (result?.user_id && result?.email) {
        // Redirect to OTP verification page with user_id and email
        router.push(NavigationHelper.toVerifyOTP(result.user_id, result.email));
      } else {
        console.error('❌ Missing user_id or email in response:', result);
        toast.error(loginErrorMessages.MISSING_DATA);
      }
    } catch (error) {
      // Error already handled by the mutation
      console.error('❌ Login error:', error);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
