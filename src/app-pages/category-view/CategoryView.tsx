import { Button } from '@/components/ui/button';
import { Category } from '@/queries/categories/useGetCategories.query';

export const CategoryView = ({ row }: { row: Category }) => {
  return (
    <>
      <Button variant="ghost">View</Button>
    </>
  );
};

