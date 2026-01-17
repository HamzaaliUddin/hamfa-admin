import { CrudLayout } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { collectionsFormRules } from './CollectionsAddEdit.helper';
import CollectionsAddEditMedia from './CollectionsAddEditMedia';
import { useGetCategories } from '@/queries';

type Props = {
  isEdit?: boolean;
  title?: string;
  initialValues?: Record<string, any>;
  handleRequest: (payload: any, setError: any, reset: any) => void;
};

const defaultFormValues = {
  title: '',
  image: '',
  category_id: '',
  show_in_nav: false,
};

const CollectionsAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();
  const { data: categoriesData } = useGetCategories();

  const methods = useForm({
    defaultValues: isEdit && initialValues ? initialValues : defaultFormValues,
  });

  // Reset form with initial values when they become available (for edit mode)
  // Use title as a stable dependency to detect when data has loaded
  useEffect(() => {
    if (initialValues && isEdit && initialValues.title) {
      methods.reset(initialValues);
    }
  }, [initialValues?.title, initialValues?.image, initialValues?.category_id, initialValues?.show_in_nav, isEdit, methods]);
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = collectionsFormRules();

  const handleForm = (values: Record<string, any>) => {
    // Validate image URL
    if (!values.image && !isEdit) {
      toast.error('Please provide a collection image URL');
      return;
    }

    // Use FormData for backend compatibility
    const formData = new FormData();
    formData.append('title', values.title);
    if (values.image) {
      formData.append('image', values.image);
    }
    if (values.category_id) {
      formData.append('category_id', values.category_id);
    }
    formData.append('show_in_nav', values.show_in_nav ? 'true' : 'false');

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
              <CollectionsAddEditMedia />
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
