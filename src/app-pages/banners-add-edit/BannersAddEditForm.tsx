import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CrudLayout, CrudFormSection } from '@/components/common/crud-layout';
import BannersAddEditMedia from './BannersAddEditMedia';

type Props = {
  isEdit?: boolean;
  title?: string;
  initialValues?: any;
  handleRequest: any;
};

const BannersAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          image: null,
        },
  });
  const { handleSubmit, setError, reset } = methods;

  const handleForm = (values: any) => {
    // If image is a file, use FormData
    const selectedFirstFile = values?.image?.[0];

    if (selectedFirstFile instanceof File) {
      const formData = new FormData();
      formData.append('image', selectedFirstFile);
      handleRequest(formData, setError, reset);
    } else if (typeof values?.image === 'string') {
      // If image is a URL string (for edit)
      handleRequest({ image: values.image }, setError, reset);
    } else {
      handleRequest(values, setError, reset);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <CrudLayout
      title={isEdit ? title || 'Edit Banner' : 'Add Banner'}
      description={isEdit ? 'Update banner image' : 'Create a new banner'}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="mx-auto">
            <BannersAddEditMedia isEdit={isEdit} />
            <p className="text-muted-foreground mt-4 text-sm">
              Upload a banner image. Recommended size: 1920x600 pixels.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? 'Update Banner' : 'Create Banner'}</Button>
          </div>
        </form>
      </FormProvider>
    </CrudLayout>
  );
};

export default BannersAddEditForm;
