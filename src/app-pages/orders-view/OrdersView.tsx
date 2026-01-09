'use client';
import { isEmpty } from 'lodash';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageLoader from '@/components/common/PageLoader';
import { useGetOrderById } from '@/queries/orders/useGetOrderById.query';
import ROUTES from '@/utils/route';
import PageEmpty from '@/components/common/PageEmpty';
import OrdersViewProducts from './OrdersViewProducts';
import OrdersViewInvoice from './OrdersViewInvoice';
import OrdersViewInfo from './OrdersViewInfo';
import OrdersViewPayment from './OrdersViewPayment';
import OrdersViewCustomer from './OrdersViewCustomer';

type Props = {
  id: string | number;
};

const OrdersView = ({ id }: Props) => {
  const router = useRouter();
  const { data: order, isLoading, isFetching } = useGetOrderById(id);

  return (
    <>
      <PageLoader isOpen={isFetching} />

      {!isLoading && isEmpty(order) && <PageEmpty />}

      {!isEmpty(order) && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(ROUTES.ORDERS.LIST)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-semibold">
                Order: {order?.order_id}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(ROUTES.ORDERS.EDIT(order.order_id))}
              >
                Edit Order
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                <OrdersViewProducts
                  isLoading={isLoading}
                  products={order?.items || []}
                />
              </Card>

              <Card className="p-6">
                <OrdersViewInvoice order={order} />
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <OrdersViewInfo order={order} />
              </Card>

              <Card className="p-6">
                <OrdersViewPayment order={order} />
              </Card>

              <Card className="p-6">
                <OrdersViewCustomer order={order} />
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrdersView;

