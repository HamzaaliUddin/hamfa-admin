'use client';
import PageLoader from '@/components/common/PageLoader';
import { useCreateBrand } from '@/queries/brands/useCreateBrand.query';
import { ErrorResponseType } from '@/types/api.types';
import { throwFormError } from '@/utils/Errors.util';
import { ErrorOption } from 'react-hook-form';
import BrandsAddEditForm from './BrandsAddEditForm';

const BrandsAdd = () => {
  const { mutate: onAddBrand, status } = useCreateBrand();
  const isLoading = status === 'pending';

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onAddBrand(formData, {
      onSuccess: () => {
        reset();
        // Don't redirect - stay on the add page
      },
      onError: (error: ErrorResponseType) => throwFormError(error, setError),
    });
  };

  return (
    <>
      <PageLoader isOpen={isLoading} />
      <BrandsAddEditForm handleRequest={handleRequest} />
    </>
  );
};

export default BrandsAdd;
