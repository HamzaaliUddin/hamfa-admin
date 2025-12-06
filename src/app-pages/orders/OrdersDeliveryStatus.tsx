import { Badge } from '@/components/ui/badge';
import { Order } from '@/queries/orders/useGetOrders.query';

type Props = {
  row: Order;
};

const OrdersDeliveryStatus = ({ row }: Props) => {
  const status = row?.status || 'pending';

  const statusText = {
    'pending': 'Pending',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  }[status];
  
  const variantClass = {
    'pending': 'bg-gray-100 text-gray-700 hover:bg-gray-100',
    'processing': 'bg-orange-100 text-orange-700 hover:bg-orange-100',
    'shipped': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    'delivered': 'bg-green-100 text-green-700 hover:bg-green-100',
    'cancelled': 'bg-red-100 text-red-700 hover:bg-red-100'
  }[status];

  return statusText ? (
    <Badge variant="outline" className={variantClass}>
      {statusText}
    </Badge>
  ) : (
    <span>-</span>
  );
};

export default OrdersDeliveryStatus;

