'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
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
          redirect_url: '',
          image_url: null
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = bannerFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description || '');
    formData.append('redirect_url', values.redirect_url || '');

    handleRequest(formData, setError, reset);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <FormInput
            name="title"
            label="Banner Title"
            control={control}
            rules={formRules.title}
          />
          <FormInput
            name="description"
            label="Description"
            control={control}
            rules={formRules.description}
          />
          <FormInput
            name="redirect_url"
            label="Redirect URL"
            control={control}
            rules={formRules.redirect_url}
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

