'use client';
import { ErrorOption } from 'react-hook-form';
import PageLoader from '@/components/common/PageLoader';
import { throwFormError } from '@/utils/Errors.util';
import { useCreateCategory, CreateCategoryInput } from '@/queries/categories/useCreateCategory.query';
import { ErrorResponseType } from '@/types/api.types';
import CategoriesAddEditForm from './CategoriesAddEditForm';

const CategoriesAdd = () => {
  const { mutate: onAddCategory, status } = useCreateCategory();
  const isLoading = status === 'pending';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRequest = (formData: Record<string, any>, setError: ErrorOption, reset: any) => {
    const categoryData: CreateCategoryInput = {
      name: formData.name,
      position: formData.position,
      image: formData.image,
      show_on_home: formData.show_on_home,
      status: formData.status,
    };
    
    onAddCategory(
      categoryData,
      {
        onSuccess: () => {
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

