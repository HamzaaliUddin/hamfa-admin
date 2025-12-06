import { CrudLayout } from '@/components/common/crud-layout';
import FormCheckbox from '@/components/Form/FormCheckbox';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormTextarea from '@/components/Form/FormTextarea';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { collectionsFormRules } from './CollectionsAddEdit.helper';
import CollectionsAddEditMedia from './CollectionsAddEditMedia';

type Props = {
  isEdit?: boolean;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest: (formData: FormData, setError: any, reset: any) => void;
};

const CollectionsAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          title: '',
          description: '',
          image: null,
          image_url: '',
          status: 'active',
          featured: false,
        },
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = collectionsFormRules();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleForm = (values: Record<string, any>) => {
    const formData = new FormData();
    const selectedFirstFile = values?.image?.[0];
    const imageUrl = values?.image_url?.trim();

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('status', values.status || 'active');
    formData.append('featured', values.featured ? 'true' : 'false');

    // Handle file upload or URL - send as "image" field
    if (selectedFirstFile) {
      formData.append('image', selectedFirstFile);
    } else if (imageUrl) {
      formData.append('image', imageUrl);
    } else {
      // If no image is provided, show error
      toast.error('Please provide a collection image (file or URL)');
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
      title={isEdit ? title || 'Edit Collection' : 'Add Collection'}
      description={isEdit ? 'Update collection details' : 'Create a new collection'}
      backButton={{
        label: 'Back to Collections',
        href: URLs.Collections
      }}
    >
      <FormProvider {...methods}>
        <FormWrapper asForm onSubmit={handleSubmit(handleForm)}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-4">
                <FormInput
                  name="title"
                  label="Collection Title"
                  control={control}
                  rules={formRules.title}
                  placeholder="Enter collection title"
                />
                <FormTextarea
                  name="description"
                  label="Description"
                  control={control}
                  placeholder="Enter collection description"
                  rows={5}
                />
              </div>
            </div>

            <div className="space-y-6">
              <CollectionsAddEditMedia isEdit={isEdit} />

              <div className="space-y-4">
                <FormSelect
                  options={statusOptions}
                  name="status"
                  label="Status"
                  control={control}
                  rules={formRules.status}
                />
                <FormCheckbox name="featured" label="Featured Collection" control={control} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button type="submit">Save Collection</Button>
          </div>
        </FormWrapper>
      </FormProvider>
    </CrudLayout>
  );
};

export default CollectionsAddEditForm;

