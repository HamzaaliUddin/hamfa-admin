'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'sonner';
import PageLoader from '@/components/common/PageLoader';
import { throwFormError } from '@/utils/Errors.util';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useCreateCollection } from '@/queries/collections/useCreateCollection.query';
import { ErrorResponseType } from '@/types/api.types';
import CollectionsAddEditForm from './CollectionsAddEditForm';

const CollectionsAdd = () => {
  const router = useRouter();

  const { mutate: onAddCollection, status } = useCreateCollection();
  const isLoading = status === 'pending';

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onAddCollection(
      formData,
      {
        onSuccess: (data: any) => {
          toast.success('Collection added successfully');
          reset();
          // Don't redirect - stay on the add page
        },
        onError: (error: ErrorResponseType) => throwFormError(error, setError)
      }
    );
  };

  return (
    <>
      <PageLoader isOpen={isLoading} />
      <CollectionsAddEditForm handleRequest={handleRequest} />
    </>
  );
};

export default CollectionsAdd;

