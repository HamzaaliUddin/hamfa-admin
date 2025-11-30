'use client'
import { Button } from '@/components/ui/button';
import { Brand } from '@/queries/brands/useGetBrands.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const BrandActions = ({ row }: { row: Brand }) => {
  const router = useRouter();
  const brandViewHandler = () => {
    router.push(`${ROUTES.BRANDS.DETAIL(row.brand_id)}`);
  };

  const brandEditHandler = () => {
    router.push(`${ROUTES.BRANDS.EDIT(row.brand_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={brandViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={brandEditHandler}>
        Edit
      </Button>
    </>
  );
};
