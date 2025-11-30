'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormTextarea from '@/components/Form/FormTextarea';
import FormSelect from '@/components/Form/FormSelect';
import { categoryFormRules } from './Categories.helper';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
};

const CategoryAddEditForm = ({ initialValues, handleRequest, onClose }: Props) => {
  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          name: '',
          slug: '',
          description: '',
          parent_id: '',
          image: null,
          status: 'active'
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = categoryFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('description', values.description);
    formData.append('status', values.status || 'active');
    if (values.parent_id) {
      formData.append('parent_id', values.parent_id);
    }

    handleRequest(formData, setError, reset);
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <FormInput
            name="name"
            label="Category Name"
            control={control}
            rules={formRules.name}
            required
          />
          <FormInput
            name="slug"
            label="Slug"
            control={control}
            rules={formRules.slug}
            required
            placeholder="category-slug"
          />
          <FormTextarea
            name="description"
            label="Description"
            control={control}
            rules={formRules.description}
            required
          />
          <FormSelect
            name="status"
            label="Status"
            options={statusOptions}
            control={control}
            required
          />
          <FormInput
            name="parent_id"
            label="Parent Category ID (Optional)"
            control={control}
            type="number"
          />

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" size="lg">
              Save
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

export default CategoryAddEditForm;

