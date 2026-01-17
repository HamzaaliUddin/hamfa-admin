import { CrudLayout } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { brandsFormRules } from './BrandsAddEdit.helper';
import BrandsAddEditMedia from './BrandsAddEditMedia';

type Props = {
  isEdit?: boolean;
  title?: string;
  initialValues?: Record<string, any>;
  handleRequest: (payload: any, setError: any, reset: any) => void;
};

const defaultFormValues = {
  name: '',
  image: '',
  status: 'active',
};

const BrandsAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: isEdit && initialValues ? initialValues : defaultFormValues,
  });

  // Reset form with initial values when they become available (for edit mode)
  useEffect(() => {
    if (initialValues && isEdit && initialValues.name) {
      methods.reset(initialValues);
    }
  }, [initialValues?.name, initialValues?.image, initialValues?.status, isEdit, methods]);
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = brandsFormRules();

  const handleForm = (values: Record<string, any>) => {
    // Validate logo URL
    if (!values.image) {
      toast.error('Please provide a brand logo URL');
      return;
    }

    // Use FormData for backend compatibility
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('logo', values.image);
    formData.append('status', values.status || 'active');

    handleRequest(formData, setError, reset);
  };

  const handleGoBack = () => {
    router.back();
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <CrudLayout
      title={isEdit ? title || 'Edit Brand' : 'Add Brand'}
      description={isEdit ? 'Update brand details' : 'Create a new brand'}
      backButton={{
        label: 'Back to Brands',
        href: URLs.Brands
      }}
    >
      <FormProvider {...methods}>
        <FormWrapper asForm onSubmit={handleSubmit(handleForm)}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-4">
                <FormInput
                  name="name"
                  label="Brand Name"
                  control={control}
                  rules={formRules.name}
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            <div className="space-y-6">
              <BrandsAddEditMedia />

              <div className="space-y-4">
                <FormSelect
                  options={statusOptions}
                  name="status"
                  label="Status"
                  control={control}
                  rules={formRules.status}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button type="submit">Save Brand</Button>
          </div>
        </FormWrapper>
      </FormProvider>
    </CrudLayout>
  );
};

export default BrandsAddEditForm;
