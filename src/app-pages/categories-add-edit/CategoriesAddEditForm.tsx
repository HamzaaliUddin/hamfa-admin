import { CrudLayout } from '@/components/common/crud-layout';
import FormInput from '@/components/Form/FormInput';
import FormWrapper from '@/components/Form/FormWrapper';
import { Button } from '@/components/ui/button';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { categoriesFormRules } from './CategoriesAddEdit.helper';

type Props = {
  isEdit?: boolean;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest: (formData: FormData, setError: any, reset: any) => void;
};

const CategoriesAddEditForm = ({ isEdit, title, initialValues, handleRequest }: Props) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          name: '',
        },
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = categoriesFormRules();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleForm = (values: Record<string, any>) => {
    const formData = new FormData();
    formData.append('name', values.name);

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
          <div className="space-y-6">
            <div className="space-y-4">
              <FormInput
                name="name"
                label="Category Name"
                control={control}
                rules={formRules.name}
                placeholder="Enter category name"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleGoBack}>
                Cancel
              </Button>
              <Button type="submit">Save Category</Button>
            </div>
          </div>
        </FormWrapper>
      </FormProvider>
    </CrudLayout>
  );
};

export default CategoriesAddEditForm;
