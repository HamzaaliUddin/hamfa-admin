'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import PageLoader from '@/components/common/PageLoader';
import { throwFormError } from '@/utils/Errors.util';
import { useCreateProduct } from '@/queries/products/useCreateProduct.query';
import { ErrorResponseType } from '@/types/api.types';
import ProductAddEditForm from './ProductAddEditForm';
import { CrudLayout } from '@/components/common/crud-layout';
import URLs from '@/utils/URLs.util';

const ProductsAddPage = () => {
  const router = useRouter();

  const { mutate: onAddProduct, status } = useCreateProduct();
  const isLoading = status === 'pending';

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onAddProduct(
      formData,
      {
        onSuccess: () => {
          reset();
          router.push(URLs.Products);
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };

  const handleClose = () => {
    router.push(URLs.Products);
  };

  return (
    <>
      <PageLoader isOpen={isLoading} />
      <CrudLayout
        title="Add New Product"
        description="Create a new product"
        backButton={{ label: 'Back to Products', href: URLs.Products }}
      >
        <ProductAddEditForm handleRequest={handleRequest} onClose={handleClose} isEdit={false} />
      </CrudLayout>
    </>
  );
};

export default ProductsAddPage;

