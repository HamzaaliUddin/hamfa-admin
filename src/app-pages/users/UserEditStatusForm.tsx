'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
};

const UserEditStatusForm = ({ initialValues, handleRequest, onClose }: Props) => {
  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          is_active: true
        }
  });
  const { handleSubmit, setValue, watch, setError, reset } = methods;
  const isActive = watch('is_active');

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('is_active', values.is_active.toString());

    handleRequest(formData, setError, reset);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <div className="grid gap-2">
            <Label htmlFor="is_active">User Status *</Label>
            <Select 
              value={isActive ? 'true' : 'false'}
              onValueChange={(value) => setValue('is_active', value === 'true')}
            >
              <SelectTrigger id="is_active">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Set user account status (Active users can login)
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" size="lg">
              Save Status
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserEditStatusForm;

