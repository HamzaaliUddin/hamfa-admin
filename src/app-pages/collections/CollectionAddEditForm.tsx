'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormTextarea from '@/components/Form/FormTextarea';
import FormSelect from '@/components/Form/FormSelect';
import FormCheckbox from '@/components/Form/FormCheckbox';
import { collectionFormRules } from './Collections.helper';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
};

const CollectionAddEditForm = ({ initialValues, handleRequest, onClose }: Props) => {
  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          title: '',
          slug: '',
          description: '',
          image: null,
          status: 'active',
          featured: false
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = collectionFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('slug', values.slug);
    formData.append('description', values.description);
    formData.append('status', values.status || 'active');
    formData.append('featured', String(values.featured || false));

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
            name="title"
            label="Collection Title"
            control={control}
            rules={formRules.title}
            required
          />
          <FormInput
            name="slug"
            label="Slug"
            control={control}
            rules={formRules.slug}
            required
            placeholder="collection-slug"
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
          <FormCheckbox
            name="featured"
            label="Featured Collection"
            control={control}
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

export default CollectionAddEditForm;

