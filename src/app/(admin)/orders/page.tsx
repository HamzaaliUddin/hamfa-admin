import { OrdersList } from '@/app-pages/orders';
import { CrudLayout } from '@/components/common/crud-layout';

export default function OrdersPage() {
  return (
    <CrudLayout
      title="Orders"
      description="Manage customer orders"
    >
      <OrdersList />
    </CrudLayout>
  );
}
