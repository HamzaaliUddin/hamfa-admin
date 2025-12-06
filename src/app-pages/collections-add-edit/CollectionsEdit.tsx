'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'sonner';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateCollection } from '@/queries/collections/useUpdateCollection.query';
import { useGetCollectionById } from '@/queries/collections/useGetCollectionById.query';
import { ErrorResponseType } from '@/types/api.types';
import CollectionsAddEditForm from './CollectionsAddEditForm';

type Props = {
  id: string;
};

const CollectionsEdit = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetCollectionById(id);
  const collection = data as any;

  const { mutate: onUpdateCollection, status } = useUpdateCollection();
  const isUpdating = status === 'pending';

  const initialValues = {
    title: collection?.title || '',
    description: collection?.description || '',
    status: collection?.status || 'active',
    featured: collection?.featured || false,
    existing_image: collection?.image, // For FE Only
    image: null,
    image_url: ''
  };

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateCollection(
      { id, data: formData },
      {
        onSuccess: () => {
          toast.success('Collection updated successfully');

          reset();

          const url = makeURL(URLs.CollectionsView, { id });
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

