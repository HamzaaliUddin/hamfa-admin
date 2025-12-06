'use client';

import { Button } from '@/components/ui/button';
import { Order } from '@/queries/orders/useGetOrders.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const OrderActions = ({ row }: { row: Order }) => {
  const router = useRouter();
  
  const orderViewHandler = () => {
    router.push(ROUTES.ORDERS.DETAIL(row.order_id));
  };

  const orderEditHandler = () => {
    router.push(ROUTES.ORDERS.EDIT(row.order_id));
  };

  return (
    <>
      <Button variant="ghost" onClick={orderViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={orderEditHandler}>
        Edit
      </Button>
    </>
  );
};

