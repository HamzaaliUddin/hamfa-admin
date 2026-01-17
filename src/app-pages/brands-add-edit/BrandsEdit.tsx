'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateBrand } from '@/queries/brands/useUpdateBrand.query';
import { useGetBrandById } from '@/queries/brands/useGetBrandById.query';
import { ErrorResponseType } from '@/types/api.types';
import BrandsAddEditForm from './BrandsAddEditForm';
import { useMemo } from 'react';

type Props = {
  id: string;
};

const BrandsEdit = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading, isSuccess } = useGetBrandById(id);
  const brand = data as any;

  const { mutate: onUpdateBrand, status } = useUpdateBrand();
  const isUpdating = status === 'pending';

  // Memoize initialValues to prevent unnecessary re-renders
  const initialValues = useMemo(() => ({
    name: brand?.name || '',
    status: brand?.status || 'active',
    image: brand?.logo || ''
  }), [brand?.name, brand?.status, brand?.logo]);

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateBrand(
      { id, data: formData },
      {
        onSuccess: () => {
          reset();
          const url = makeURL(URLs.BrandsView, { id });
          router.replace(url);
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };

  // Wait for both loading to complete AND data to be available
  const isDataReady = !isLoading && isSuccess && brand;
  
  return (
    <>
      <PageLoader isOpen={isLoading || isUpdating || !isDataReady} />

      {isDataReady && (
        <BrandsAddEditForm
          isEdit
          title={brand?.name}
          initialValues={initialValues}
          handleRequest={handleRequest}
        />
      )}
    </>
  );
};

export default BrandsEdit;

