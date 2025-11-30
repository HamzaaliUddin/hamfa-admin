'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'sonner';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateBrand } from '@/queries/brands/useUpdateBrand.query';
import { useGetBrandById } from '@/queries/brands/useGetBrandById.query';
import { ErrorResponseType } from '@/types/api.types';
import BrandsAddEditForm from './BrandsAddEditForm';

type Props = {
  id: string;
};

const BrandsEdit = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetBrandById(id);
  const brand = data as any;

  const { mutate: onUpdateBrand, status } = useUpdateBrand();
  const isUpdating = status === 'pending';

  const initialValues = {
    name: brand?.name || '',
    description: brand?.description || '',
    status: brand?.status || 'active',
    featured: brand?.featured || false,
    existing_logo: brand?.logo, // For FE Only
    image: null,
    image_url: ''
  };

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateBrand(
      { id, data: formData },
      {
        onSuccess: () => {
          toast.success('Brand updated successfully');

          reset();

          const url = makeURL(URLs.BrandsView, { id });
          router.replace(url);
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };
  
  return (
    <>
      <PageLoader isOpen={isLoading || isUpdating} />

      {!isLoading && (
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

