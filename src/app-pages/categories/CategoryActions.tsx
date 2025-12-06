'use client';

import { Button } from '@/components/ui/button';
import { Category } from '@/queries/categories/useGetCategories.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

const CategoryActions = ({ row }: { row: Category }) => {
  const router = useRouter();
  const categoryViewHandler = () => {
    router.push(`${ROUTES.CATEGORIES.DETAIL(row.category_id)}`);
  };

  const categoryEditHandler = () => {
    router.push(`${ROUTES.CATEGORIES.EDIT(row.category_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={categoryViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={categoryEditHandler}>
        Edit
      </Button>
    </>
  );
};

export default CategoryActions;

