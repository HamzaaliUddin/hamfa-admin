'use client';

import { LoginBackgroundImage } from './LoginBackgroundImage';
import { LoginCard } from './LoginCard';
import { LoginForm } from './LoginForm';
import { useLoginForm } from './useLoginForm.hook';

export function Login() {
  const { control, handleSubmit, errors, onSubmit, isLoading } = useLoginForm();

  return (
    <LoginBackgroundImage>
      <LoginCard>
        <LoginForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          isLoading={isLoading}
        />
      </LoginCard>
    </LoginBackgroundImage>
  );
}
