'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import { brandFormRules } from './Brands.helper';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
};

const BrandAddEditForm = ({ initialValues, handleRequest, onClose }: Props) => {
  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          name_en: '',
          name_ar: '',
          image_url: null
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = brandFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('name_en', values.name_en);
    formData.append('name_ar', values.name_ar);

    handleRequest(formData, setError, reset);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <FormInput
            name="name_en"
            label="Brand Name (English)"
            control={control}
            rules={formRules.name}
            dir="ltr"
          />
          <FormInput
            name="name_ar"
            label="Brand Name (Arabic)"
            control={control}
            rules={formRules.name}
            dir="rtl"
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

export default BrandAddEditForm;

