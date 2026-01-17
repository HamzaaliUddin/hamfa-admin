'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateCollection } from '@/queries/collections/useUpdateCollection.query';
import { useGetCollectionById } from '@/queries/collections/useGetCollectionById.query';
import { ErrorResponseType } from '@/types/api.types';
import CollectionsAddEditForm from './CollectionsAddEditForm';
import { useMemo } from 'react';

type Props = {
  id: string;
};

const CollectionsEdit = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading, isSuccess } = useGetCollectionById(id);
  const collection = data as any;

  const { mutate: onUpdateCollection, status } = useUpdateCollection();
  const isUpdating = status === 'pending';

  // Memoize initialValues to prevent unnecessary re-renders
  const initialValues = useMemo(() => ({
    title: collection?.title || '',
    image: collection?.image || '',
    category_id: collection?.category_id?.toString() || '',
    show_in_nav: collection?.show_in_nav || false,
  }), [collection?.title, collection?.image, collection?.category_id, collection?.show_in_nav]);

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateCollection(
      { id, data: formData },
      {
        onSuccess: () => {
          reset();
          const url = makeURL(URLs.CollectionsView, { id });
          router.replace(url);
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };

  // Wait for both loading to complete AND data to be available
  const isDataReady = !isLoading && isSuccess && collection;
  
  return (
    <>
      <PageLoader isOpen={isLoading || isUpdating || !isDataReady} />

      {isDataReady && (
        <CollectionsAddEditForm
          isEdit
          title={collection?.title}
          initialValues={initialValues}
          handleRequest={handleRequest}
        />
      )}
    </>
  );
};

export default CollectionsEdit;

