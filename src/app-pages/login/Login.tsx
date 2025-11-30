'use client';

import { LoginForm } from './LoginForm';
import { useLoginForm } from './useLoginForm.hook';

export function Login() {
  const { control, handleSubmit, onSubmit, isLoading } = useLoginForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <LoginForm onSubmit={handleSubmit(onSubmit)} control={control} isLoading={isLoading} />
    </div>
  );
}
