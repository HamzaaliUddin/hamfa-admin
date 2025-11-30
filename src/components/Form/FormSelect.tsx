'use client';

import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type SelectOption = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
  rules?: RegisterOptions<T>;
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select an option',
  options,
  disabled = false,
  required = false,
  className,
  rules
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
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className={error ? 'border-destructive' : ''}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
}

export default FormSelect;

