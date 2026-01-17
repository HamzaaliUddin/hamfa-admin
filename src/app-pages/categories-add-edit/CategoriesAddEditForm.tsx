import { CrudLayout } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import FormCheckbox from '@/components/Form/FormCheckbox';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { categoriesFormRules } from './CategoriesAddEdit.helper';
import CategoriesAddEditMedia from './CategoriesAddEditMedia';

type Props = {
  isEdit?: boolean;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest: (formData: Record<string, any>, setError: any, reset: any) => void;
};

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const CategoriesAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          name: '',
          position: '',
          image: '',
          show_on_home: false,
          status: 'active',
        },
  });
  const { handleSubmit, control, setError, reset, watch } = methods;
  const formRules = categoriesFormRules();

  // Watch for conditional display
  const showOnHome = watch('show_on_home');
  const image = watch('image');
  
  // Warnings
  const showImageWarning = showOnHome && !image;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleForm = (values: Record<string, any>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: Record<string, any> = {
      name: values.name,
      show_on_home: values.show_on_home || false,
      status: values.status || 'active',
    };

    if (values.show_on_home) {
      // showOnHome = true: image required, position NOT allowed
      formData.image = values.image || null;
      formData.position = null;
    } else {
      // showOnHome = false: position required, image optional
      formData.image = values.image || null;
      if (values.position !== '' && values.position !== undefined && values.position !== null) {
        formData.position = Number(values.position);
      }
    }

    handleRequest(formData, setError, reset);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <CrudLayout
      title={isEdit ? title || 'Edit Category' : 'Add Category'}
      description={isEdit ? 'Update category details' : 'Create a new category'}
      backButton={{
        label: 'Back to Categories',
        href: URLs.Categories
      }}
    >
      <FormProvider {...methods}>
        <FormWrapper asForm onSubmit={handleSubmit(handleForm)}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-4">
                <FormInput
                  name="name"
                  label="Category Name"
                  control={control}
                  rules={formRules.name}
                  placeholder="Enter category name"
                />

                <FormSelect
                  options={statusOptions}
                  name="status"
                  label="Status"
                  control={control}
                  rules={formRules.status}
                />
              </div>

              {/* Home Display Settings */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-medium">Display Settings</h3>
                
                <FormCheckbox
                  name="show_on_home"
                  label="Show on Home Page"
                  control={control}
                  description="Display this category as a circular item below the banner on the home page"
                />

                {showOnHome ? (
                  <>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        When &quot;Show on Home Page&quot; is enabled, an image is required and position is not applicable.
                      </AlertDescription>
                    </Alert>

                    {showImageWarning && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          An image is required when &quot;Show on Home Page&quot; is enabled. Please upload an image.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                ) : (
                  <FormInput
                    name="position"
                    label="Position"
                    type="number"
                    control={control}
                    rules={formRules.position}
                    placeholder="Enter display position (required, lower number = higher priority)"
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              <CategoriesAddEditMedia />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancel
            </Button>
            <Button type="submit">Save Category</Button>
          </div>
        </FormWrapper>
      </FormProvider>
    </CrudLayout>
  );
};

export default CategoriesAddEditForm;
