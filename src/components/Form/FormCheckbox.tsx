'use client';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  className
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            {label && <Label htmlFor={name} className="cursor-pointer">{label}</Label>}
          </div>
          {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
}

export default FormCheckbox;

