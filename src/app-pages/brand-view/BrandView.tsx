import { Button } from '@/components/ui/button';
import { IBrand } from '@/types/api.types';

export const BrandView = ({ row }: { row: IBrand }) => {
  return (
    <>
      <Button variant="ghost">View</Button>
    </>
  );
};
