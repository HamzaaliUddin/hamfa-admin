'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { LoginFormData } from './login.schema';
import { loginFormFields, loginValidationRules } from './LoginHelper';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, control, errors, isLoading }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor={loginFormFields.email.id}>{loginFormFields.email.label}</Label>
        <Controller
          name={loginFormFields.email.name}
          control={control}
          rules={loginValidationRules.email}
          render={({ field }) => (
            <Input
              {...field}
              id={loginFormFields.email.id}
              type={loginFormFields.email.type}
              placeholder={loginFormFields.email.placeholder}
              disabled={isLoading}
            />
          )}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor={loginFormFields.password.id}>{loginFormFields.password.label}</Label>
        <Controller
          name={loginFormFields.password.name}
          control={control}
          rules={loginValidationRules.password}
          render={({ field }) => (
            <Input
              {...field}
              id={loginFormFields.password.id}
              type={loginFormFields.password.type}
              placeholder={loginFormFields.password.placeholder}
              disabled={isLoading}
            />
          )}
        />
        {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      {/* Helper Text */}
      <p className="text-muted-foreground text-center text-sm">Use: admin@hamfa.com / Admin@123!</p>
    </form>
  );
}
