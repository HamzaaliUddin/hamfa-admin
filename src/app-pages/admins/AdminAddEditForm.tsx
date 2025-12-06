'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormCheckbox from '@/components/Form/FormCheckbox';
import { adminFormRules } from './Admins.helper';
import { useGetRoles, useGetModules } from '@/queries/admins';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
  isEdit?: boolean;
};

const AdminAddEditForm = ({ initialValues, handleRequest, onClose, isEdit = false }: Props) => {
  const { data: rolesData, isLoading: rolesLoading } = useGetRoles();
  const { data: modulesData, isLoading: modulesLoading } = useGetModules();

  const roles = rolesData?.data || [];

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          name: '',
          email: '',
          password: '',
          role_id: '',
          is_active: true,
        },
  });

  const { handleSubmit, control, setError, reset } = methods;
  const formRules = adminFormRules();

  const handleForm = (values: any) => {
    const formData: any = {
      name: values.name,
      email: values.email,
      role_id: Number(values.role_id),
      is_active: values.is_active,
    };

    // Only include password if provided (for edit mode)
    if (values.password) {
      formData.password = values.password;
    }

    handleRequest(formData, setError, reset);
  };

  const roleOptions = roles.map((role: any) => ({
    value: String(role.role_id),
    label: role.name,
  }));

  if (rolesLoading || modulesLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <FormInput
            name="name"
            label="Full Name"
            control={control}
            rules={formRules.name}
            required
          />
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            control={control}
            rules={formRules.email}
            required
          />
          <FormInput
            name="password"
            label={isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
            type="password"
            control={control}
            rules={isEdit ? {} : formRules.password}
            required={!isEdit}
          />
          <FormSelect
            name="role_id"
            label="Admin Role"
            options={roleOptions}
            control={control}
            rules={formRules.role_id}
            required
          />
          <FormCheckbox name="is_active" label="Set account as active" control={control} />

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" size="lg">
              {isEdit ? 'Save Changes' : 'Create Admin'}
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

export default AdminAddEditForm;

