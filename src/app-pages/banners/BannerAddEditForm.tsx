'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormTextarea from '@/components/Form/FormTextarea';
import FormSelect from '@/components/Form/FormSelect';
import { bannerFormRules } from './Banners.helper';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
};

const BannerAddEditForm = ({ initialValues, handleRequest, onClose }: Props) => {
  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          title: '',
          description: '',
          image: null,
          status: 'active',
          start_date: '',
          end_date: ''
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = bannerFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('status', values.status || 'active');
    if (values.start_date) formData.append('start_date', values.start_date);
    if (values.end_date) formData.append('end_date', values.end_date);

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
            label="Banner Title"
            control={control}
            rules={formRules.title}
            required
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
            name="start_date"
            label="Start Date"
            type="date"
            control={control}
          />
          <FormInput
            name="end_date"
            label="End Date"
            type="date"
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

export default BannerAddEditForm;

