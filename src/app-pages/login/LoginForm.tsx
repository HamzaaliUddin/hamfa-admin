'use client';

import { FormInput, FormWrapper } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Control } from 'react-hook-form';
import { LoginFormData } from './login.schema';
import { loginFormFields, loginValidationRules } from './LoginHelper';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<LoginFormData>;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, control, isLoading }: LoginFormProps) {
  return (
    <FormWrapper onSubmit={onSubmit} asForm>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        <CardDescription>Enter your credentials to access the admin panel</CardDescription>
      </CardHeader>
      {/* Email Field */}
      <FormInput
        control={control}
        name={loginFormFields.email.name}
        label={loginFormFields.email.label}
        type={loginFormFields.email.type}
        placeholder={loginFormFields.email.placeholder}
        disabled={isLoading}
        required
        rules={loginValidationRules.email}
        className="space-y-2"
      />

      {/* Password Field */}
      <FormInput
        control={control}
        name={loginFormFields.password.name}
        label={loginFormFields.password.label}
        type={loginFormFields.password.type}
        placeholder={loginFormFields.password.placeholder}
        disabled={isLoading}
        required
        rules={loginValidationRules.password}
        className="space-y-2"
      />

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

    </FormWrapper>
  );
}
