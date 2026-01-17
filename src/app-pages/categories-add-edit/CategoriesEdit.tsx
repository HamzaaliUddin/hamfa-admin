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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const category = data as any;

  const { mutate: onUpdateCategory, status } = useUpdateCategory();
  const isUpdating = status === 'pending';

  const initialValues = {
    name: category?.name || '',
    position: category?.position ?? '',
    image: category?.image || '',
    show_on_home: category?.show_on_home ?? false,
    status: category?.status || 'active',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRequest = (formData: Record<string, any>, setError: ErrorOption, reset: any) => {
    const categoryData = {
      name: formData.name,
      position: formData.position,
      image: formData.image,
      show_on_home: formData.show_on_home,
      status: formData.status,
    };

    onUpdateCategory(
      { id, data: categoryData },
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
