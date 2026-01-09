import { CrudLayout } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { collectionsFormRules } from './CollectionsAddEdit.helper';
import CollectionsAddEditMedia from './CollectionsAddEditMedia';
import { useGetCategories } from '@/queries';

type Props = {
  isEdit?: boolean;
  title?: string;
  initialValues?: Record<string, any>;
  handleRequest: (formData: FormData, setError: any, reset: any) => void;
};

const CollectionsAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();
  const { data: categoriesData } = useGetCategories();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          title: '',
          image: null,
          image_url: '',
          category_id: '',
          show_in_nav: false,
        },
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = collectionsFormRules();

  const handleForm = (values: Record<string, any>) => {
    const formData = new FormData();
    const selectedFirstFile = values?.image?.[0];
    const imageUrl = values?.image_url?.trim();

    formData.append('title', values.title);
    if (values.category_id) {
      formData.append('category_id', values.category_id);
    }
    formData.append('show_in_nav', values.show_in_nav ? 'true' : 'false');

    // Handle file upload or URL - send as "image" field
    if (selectedFirstFile) {
      formData.append('image', selectedFirstFile);
    } else if (imageUrl) {
      formData.append('image', imageUrl);
    } else if (!isEdit) {
      // If no image is provided for new collection, show error
      toast.error('Please provide a collection image (file or URL)');
      return;
    }

    handleRequest(formData, setError, reset);
  };

  const handleGoBack = () => {
    router.back();
  };

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

                <FormSelect
                  name="category_id"
                  label="Category (Optional)"
                  control={control}
                  placeholder="Select a category"
                  options={
                    categoriesData?.data?.map((category: any) => ({
                      label: category.name,
                      value: category.category_id.toString(),
                    })) || []
                  }
                />

                <div className="flex items-center space-x-2">
                  <Controller
                    name="show_in_nav"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <Checkbox
                        {...field}
                        id="show_in_nav"
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    )}
                  />
                  <Label htmlFor="show_in_nav">Show in Navigation</Label>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <CollectionsAddEditMedia isEdit={isEdit} />
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
