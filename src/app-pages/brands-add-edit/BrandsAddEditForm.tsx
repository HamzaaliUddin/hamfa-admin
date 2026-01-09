import { CrudLayout } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { brandsFormRules } from './BrandsAddEdit.helper';
import BrandsAddEditMedia from './BrandsAddEditMedia';

type Props = {
  isEdit?: boolean;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest: (formData: FormData, setError: any, reset: any) => void;
};

const BrandsAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          name: '',
          image: null,
          image_url: '',
          status: 'active',
        },
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = brandsFormRules();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleForm = (values: Record<string, any>) => {
    const formData = new FormData();
    const selectedFirstFile = values?.image?.[0];
    const imageUrl = values?.image_url?.trim();

    formData.append('name', values.name);
    formData.append('status', values.status || 'active');

    // Handle file upload or URL - send as "logo" field
    if (selectedFirstFile) {
      formData.append('logo', selectedFirstFile);
    } else if (imageUrl) {
      formData.append('logo', imageUrl);
    } else {
      // If no image is provided, show error
      toast.error('Please provide a brand logo (file or URL)');
      return;
    }

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
              <BrandsAddEditMedia isEdit={isEdit} />

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
