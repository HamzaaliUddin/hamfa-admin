'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'sonner';
import PageLoader from '@/components/common/PageLoader';
import { throwFormError } from '@/utils/Errors.util';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useCreateCategory } from '@/queries/categories/useCreateCategory.query';
import { ErrorResponseType } from '@/types/api.types';
import CategoriesAddEditForm from './CategoriesAddEditForm';

const CategoriesAdd = () => {
  const router = useRouter();

  const { mutate: onAddCategory, status } = useCreateCategory();
  const isLoading = status === 'pending';

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onAddCategory(
      formData,
      {
        onSuccess: (data: any) => {
          toast.success('Category added successfully');
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
      <CategoriesAddEditForm handleRequest={handleRequest} />
    </>
  );
};

export default CategoriesAdd;

