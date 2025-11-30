import { Button } from '@/components/ui/button';
import { Product } from '@/queries/products/useGetProducts.query';

export const ProductView = ({ row }: { row: Product }) => {
  return (
    <>
      <Button variant="ghost">View</Button>
    </>
  );
};

