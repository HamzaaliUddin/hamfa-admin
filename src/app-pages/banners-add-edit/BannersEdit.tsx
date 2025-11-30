'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'sonner';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateBanner } from '@/queries/banners/useUpdateBanner.query';
import { useGetBannerById } from '@/queries/banners/useGetBannerById.query';
import { ErrorResponseType } from '@/types/api.types';
import BannersAddEditForm from './BannersAddEditForm';

type Props = {
  id: string;
};

const BannersEdit = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetBannerById(id);
  const banner = data as any;

  const { mutate: onUpdateBanner, status } = useUpdateBanner();
  const isUpdating = status === 'pending';

  const initialValues = {
    status: banner?.status,
    title_en: banner?.title?.en || '',
    title_ar: banner?.title?.ar || '',
    existing_image: banner?.image_url, // For FE Only
    image_url: null
  };

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateBanner(
      { ...formData, id },
      {
        onSuccess: () => {
          toast.success('Banner updated successfully');

          reset();

          const url = makeURL(URLs.BannersView, { id });
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
        <BannersAddEditForm
          isEdit
          title={banner?.title?.en}
          initialValues={initialValues}
          handleRequest={handleRequest}
        />
      )}
    </>
  );
};

export default BannersEdit;

