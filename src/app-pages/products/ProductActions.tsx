import { Button } from '@/components/ui/button';
import { Product } from '@/queries/products/useGetProducts.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const ProductActions = ({ row }: { row: Product }) => {
  const router = useRouter();
  const productViewHandler = () => {
    router.push(`${ROUTES.PRODUCTS.DETAIL(row.product_id)}`);
  };

  const productEditHandler = () => {
    router.push(`${ROUTES.PRODUCTS.EDIT(row.product_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={productViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={productEditHandler}>
        Edit
      </Button>
    </>
  );
};

