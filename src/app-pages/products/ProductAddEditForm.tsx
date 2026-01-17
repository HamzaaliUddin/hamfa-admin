'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormTextarea from '@/components/Form/FormTextarea';
import FormSelect from '@/components/Form/FormSelect';
import { productFormRules } from './Products.helper';
import ProductsAddEditMedia from './ProductsAddEditMedia';
import { toast } from 'sonner';
import { useGetCollections } from '@/queries/collections/useGetCollections.query';
import { useGetBrands } from '@/queries/brands/useGetBrands.query';
import { CrudFormSection } from '@/components/common/crud-layout';
import { useEffect } from 'react';

type Props = {
  initialValues?: any;
  handleRequest?: any;
  onClose: any;
  isEdit?: boolean;
};

const defaultFormValues = {
  title: '',
  description: '',
  sku: '',
  image: '',
  images: [],
  price: '',
  stock: '0',
  low_stock_threshold: '10',
  brand_id: '',
  collection_id: '',
  status: 'active',
  size: 'medium',
  product_type: 'unstitched'
};

const ProductAddEditForm = ({ initialValues, handleRequest, onClose, isEdit }: Props) => {
  const { data: collectionsData } = useGetCollections();
  const { data: brandsData } = useGetBrands();

  const methods = useForm({
    defaultValues: isEdit && initialValues ? initialValues : defaultFormValues,
  });

  // Reset form with initial values when they become available (for edit mode)
  useEffect(() => {
    if (initialValues && isEdit && initialValues.title) {
      methods.reset(initialValues);
    }
  }, [initialValues?.title, initialValues?.image, initialValues?.price, isEdit, methods]);
  const { handleSubmit, control, setError, reset } = methods;
  const formRules = productFormRules();

  const handleForm = (values: any) => {
    // Validate main image URL
    if (!values.image && !isEdit) {
      toast.error('Please provide a product image URL');
      return;
    }

    // Use FormData for backend compatibility
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.sku) {
      formData.append('sku', values.sku);
    }
    if (values.image) {
      formData.append('image', values.image);
    }
    // Send images as JSON string array
    formData.append('images', JSON.stringify(values.images || []));
    formData.append('price', values.price);
    formData.append('stock', values.stock || '0');
    formData.append('low_stock_threshold', values.low_stock_threshold || '10');
    formData.append('brand_id', values.brand_id);
    formData.append('collection_id', values.collection_id);
    formData.append('status', values.status || 'active');
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

  const collectionOptions =
    collectionsData?.data?.map((collection: any) => ({
      label: collection.title,
      value: collection.collection_id.toString(),
    })) || [];

  const brandOptions =
    brandsData?.data?.map((brand: any) => ({
      label: brand.name,
      value: brand.brand_id.toString(),
    })) || [];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Section - Main Form (2 columns) */}
          <div className="space-y-6 md:col-span-2">
            {/* Basic Information */}
            <CrudFormSection title="Basic Information">
              <div className="space-y-4">
                <FormInput
                  name="title"
                  label="Product Title"
                  control={control}
                  rules={formRules.title}
                  placeholder="Enter product title"
                  required
                />
                <FormInput
                  name="sku"
                  label="SKU"
                  control={control}
                  placeholder="Auto-generated if left empty"
                  disabled={isEdit}
                />
                <FormTextarea
                  name="description"
                  label="Description"
                  control={control}
                  rules={formRules.description}
                  placeholder="Enter product description"
                  required
                />
              </div>
            </CrudFormSection>

            {/* Pricing & Inventory */}
            <CrudFormSection title="Pricing & Inventory">
              <div className="space-y-4">
                <FormInput
                  name="price"
                  label="Price (Rs)"
                  type="number"
                  control={control}
                  rules={formRules.price}
                  placeholder="0.00"
                  required
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormInput
                    name="stock"
                    label="Stock Quantity"
                    type="number"
                    control={control}
                    placeholder="0"
                  />
                  <FormInput
                    name="low_stock_threshold"
                    label="Low Stock Threshold"
                    type="number"
                    control={control}
                    placeholder="10"
                  />
                </div>
              </div>
            </CrudFormSection>

            {/* Organization */}
            <CrudFormSection title="Organization">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormSelect
                    name="brand_id"
                    label="Brand"
                    options={brandOptions}
                    control={control}
                    placeholder="Select brand"
                    required
                  />
                  <FormSelect
                    name="collection_id"
                    label="Collection"
                    options={collectionOptions}
                    control={control}
                    placeholder="Select collection"
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
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
                </div>
              </div>
            </CrudFormSection>
          </div>

          {/* Right Section - Product Images (1 column) */}
          <div className="space-y-6">
            <CrudFormSection title="Product Image">
              <ProductsAddEditMedia />
            </CrudFormSection>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductAddEditForm;
