'use client';
import { useRouter } from 'next/navigation';
import { ErrorOption } from 'react-hook-form';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { throwFormError } from '@/utils/Errors.util';
import { useUpdateCategory } from '@/queries/categories/useUpdateCategory.query';
import { useGetCategoryById } from '@/queries/categories/useGetCategoryById.query';
import { ErrorResponseType } from '@/types/api.types';
import CategoriesAddEditForm from './CategoriesAddEditForm';

type Props = {
  id: string;
};

const CategoriesEdit = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetCategoryById(id);
  const category = data as any;

  const { mutate: onUpdateCategory, status } = useUpdateCategory();
  const isUpdating = status === 'pending';

  const initialValues = {
    name: category?.name || '',
  };

  const handleRequest = (formData: any, setError: ErrorOption, reset: any) => {
    onUpdateCategory(
      { id, data: formData },
      {
        onSuccess: () => {
          reset();
          const url = makeURL(URLs.CategoriesView, { id });
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
        <CategoriesAddEditForm
          isEdit
          title={category?.name}
          initialValues={initialValues}
          handleRequest={handleRequest}
        />
      )}
    </>
  );
};

export default CategoriesEdit;
