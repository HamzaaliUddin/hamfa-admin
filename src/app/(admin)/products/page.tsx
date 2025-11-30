import { ProductsList, ProductAdd } from '@/app-pages/products';
import { CrudLayout } from '@/components/common/crud-layout';

export default function ProductsPage() {
  return (
    <CrudLayout
      title="Products"
      description="Manage your products"
      actionButton={<ProductAdd />}
    >
      <ProductsList />
    </CrudLayout>
  );
}
