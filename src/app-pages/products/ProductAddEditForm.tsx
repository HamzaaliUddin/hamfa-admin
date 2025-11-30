'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import { productFormRules } from './Products.helper';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
};

const ProductAddEditForm = ({ initialValues, handleRequest, onClose }: Props) => {
  const methods = useForm({
    defaultValues: initialValues
      ? initialValues
      : {
          title_en: '',
          title_ar: '',
          description: '',
          sku: '',
          price: '',
          stock: '',
          brand_id: '',
          category_id: '',
          image_url: null
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = productFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('title_en', values.title_en);
    formData.append('title_ar', values.title_ar);
    formData.append('description', values.description || '');
    formData.append('sku', values.sku);
    formData.append('price', values.price);
    formData.append('stock', values.stock || '0');
    formData.append('brand_id', values.brand_id || '');
    formData.append('category_id', values.category_id || '');

    handleRequest(formData, setError, reset);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <FormInput
            name="title_en"
            label="Product Title (English)"
            control={control}
            rules={formRules.title}
            dir="ltr"
          />
          <FormInput
            name="title_ar"
            label="Product Title (Arabic)"
            control={control}
            rules={formRules.title}
            dir="rtl"
          />
          <FormInput
            name="description"
            label="Description"
            control={control}
            rules={formRules.description}
          />
          <FormInput
            name="sku"
            label="SKU"
            control={control}
            rules={formRules.sku}
          />
          <FormInput
            name="price"
            label="Price"
            type="number"
            control={control}
            rules={formRules.price}
          />
          <FormInput
            name="stock"
            label="Stock"
            type="number"
            control={control}
          />
          <FormInput
            name="brand_id"
            label="Brand ID"
            type="number"
            control={control}
          />
          <FormInput
            name="category_id"
            label="Category ID"
            type="number"
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

export default ProductAddEditForm;

