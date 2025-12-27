'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'sonner';
import PageLoader from '@/components/common/PageLoader';
import { throwFormError } from '@/utils/Errors.util';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useCreateBanner } from '@/queries/banners/useCreateBanner.query';
import { ErrorResponseType } from '@/types/api.types';
import BannersAddEditForm from './BannersAddEditForm';

const BannersAdd = () => {
  const router = useRouter();

  const { mutate: onAddBanner, status } = useCreateBanner();
  const isLoading = status === 'pending';

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onAddBanner(
      formData,
      {
        onSuccess: (data: any) => {
          toast.success('Banner added successfully');

          reset();

          const url = makeURL(URLs.BannersView, {
            id: data?.data?.banner_id || ''
          });
          router.push(url);
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };

  return (
    <>
      <PageLoader isOpen={isLoading} />
      <BannersAddEditForm handleRequest={handleRequest} />
    </>
  );
};

export default BannersAdd;

