'use client';

import { useParams, useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { useMemo } from 'react';
import PageLoader from '@/components/common/PageLoader';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateProduct } from '@/queries/products/useUpdateProduct.query';
import { useGetProductById } from '@/queries/products/useGetProductById.query';
import { ErrorResponseType } from '@/types/api.types';
import ProductAddEditForm from '@/app-pages/products/ProductAddEditForm';
import { CrudLayout } from '@/components/common/crud-layout';
import URLs, { makeURL } from '@/utils/URLs.util';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, isLoading, isSuccess } = useGetProductById(id);
  const product = data as any;

  const { mutate: onUpdateProduct, status } = useUpdateProduct();
  const isUpdating = status === 'pending';

  // Parse images from JSON string if needed
  const parseImages = (images: any): string[] => {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    try {
      return JSON.parse(images);
    } catch {
      return [];
    }
  };

  // Memoize initialValues to prevent unnecessary re-renders
  const initialValues = useMemo(() => ({
    title: product?.title || '',
    description: product?.description || '',
    sku: product?.sku || '',
    image: product?.image || '',
    images: parseImages(product?.images),
    price: product?.price?.toString() || '',
    stock: product?.stock?.toString() || '0',
    low_stock_threshold: product?.low_stock_threshold?.toString() || '10',
    brand_id: product?.brand_id?.toString() || '',
    collection_id: product?.collection_id?.toString() || '',
    status: product?.status || 'active',
    size: product?.size || 'medium',
    product_type: product?.product_type || 'unstitched',
  }), [
    product?.title,
    product?.description,
    product?.sku,
    product?.image,
    product?.images,
    product?.price,
    product?.stock,
    product?.low_stock_threshold,
    product?.brand_id,
    product?.collection_id,
    product?.status,
    product?.size,
    product?.product_type,
  ]);

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateProduct(
      { id, data: formData },
      {
        onSuccess: () => {
          reset();
          const url = makeURL(URLs.ProductsView, { id });
          router.replace(url);
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };

  const handleClose = () => {
    router.push(URLs.Products);
  };

  // Wait for both loading to complete AND data to be available
  const isDataReady = !isLoading && isSuccess && product;

  return (
    <>
      <PageLoader isOpen={isLoading || isUpdating || !isDataReady} />

      {isDataReady && (
        <CrudLayout
          title={`Edit: ${product?.title || 'Product'}`}
          description="Update product details"
          backButton={{ label: 'Back to Products', href: URLs.Products }}
        >
          <ProductAddEditForm
            initialValues={initialValues}
            handleRequest={handleRequest}
            onClose={handleClose}
            isEdit
          />
        </CrudLayout>
      )}
    </>
  );
}
