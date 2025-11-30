'use client';

import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T>;
  dir?: 'ltr' | 'rtl';
};

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  className,
  rules,
  dir
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          {label && (
            <Label htmlFor={name}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
          )}
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={error ? 'border-destructive' : ''}
            dir={dir}
          />
          {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
}

export default FormInput;

