'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormTextarea from '@/components/Form/FormTextarea';
import FormSelect from '@/components/Form/FormSelect';
import FormCheckbox from '@/components/Form/FormCheckbox';
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
          title: '',
          description: '',
          sku: '',
          image: null,
          images: [],
          price: '',
          discount_price: '',
          cost: '',
          profit: '',
          stock: '0',
          low_stock_threshold: '10',
          brand_id: '',
          category_id: '',
          status: 'active',
          featured: false,
          size: 'medium',
          product_type: 'unstitched'
        }
  });
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = productFormRules();

  const handleForm = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('sku', values.sku);
    formData.append('price', values.price);
    if (values.discount_price) formData.append('discount_price', values.discount_price);
    if (values.cost) formData.append('cost', values.cost);
    if (values.profit) formData.append('profit', values.profit);
    formData.append('stock', values.stock || '0');
    formData.append('low_stock_threshold', values.low_stock_threshold || '10');
    formData.append('brand_id', values.brand_id);
    formData.append('category_id', values.category_id);
    formData.append('status', values.status || 'active');
    formData.append('featured', String(values.featured || false));
    formData.append('size', values.size);
    formData.append('product_type', values.product_type);

    handleRequest(formData, setError, reset);
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const productTypeOptions = [
    { value: 'stitched', label: 'Stitched' },
    { value: 'unstitched', label: 'Unstitched' }
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="space-y-4 p-6">
          <FormInput
            name="title"
            label="Product Title"
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
          <FormInput
            name="sku"
            label="SKU"
            control={control}
            rules={formRules.sku}
            required
          />
          <FormInput
            name="price"
            label="Price"
            type="number"
            control={control}
            rules={formRules.price}
            required
          />
          <FormInput
            name="discount_price"
            label="Discount Price"
            type="number"
            control={control}
          />
          <FormInput
            name="cost"
            label="Cost"
            type="number"
            control={control}
          />
          <FormInput
            name="profit"
            label="Profit"
            type="number"
            control={control}
          />
          <FormInput
            name="stock"
            label="Stock"
            type="number"
            control={control}
          />
          <FormInput
            name="low_stock_threshold"
            label="Low Stock Threshold"
            type="number"
            control={control}
          />
          <FormInput
            name="brand_id"
            label="Brand ID"
            type="number"
            control={control}
            required
          />
          <FormInput
            name="category_id"
            label="Category ID"
            type="number"
            control={control}
            required
          />
          <FormSelect
            name="status"
            label="Status"
            options={statusOptions}
            control={control}
            required
          />
          <FormSelect
            name="size"
            label="Size"
            options={sizeOptions}
            control={control}
            required
          />
          <FormSelect
            name="product_type"
            label="Product Type"
            options={productTypeOptions}
            control={control}
            required
          />
          <FormCheckbox
            name="featured"
            label="Featured Product"
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

