import { BrandsList, BrandAdd } from '@/app-pages/brands';
import { CrudLayout } from '@/components/common/crud-layout';

export default function BrandsPage() {
  return (
    <CrudLayout
      title="Brands"
      description="Manage product brands"
      actionButton={<BrandAdd />}
    >
      <BrandsList />
    </CrudLayout>
  );
}
