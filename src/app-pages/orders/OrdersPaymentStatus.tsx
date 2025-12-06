import { Badge } from '@/components/ui/badge';
import { Order } from '@/queries/orders/useGetOrders.query';

type Props = {
  row: Order;
};

const OrdersPaymentStatus = ({ row }: Props) => {
  const paymentStatus = row?.payment_status || 'pending';

  const statusText = {
    'pending': 'Pending Payment',
    'paid': 'Fully Paid',
    'failed': 'Failed'
  }[paymentStatus];

  const variantClass = {
    'pending': 'bg-orange-100 text-orange-700 hover:bg-orange-100',
    'paid': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    'failed': 'bg-red-100 text-red-700 hover:bg-red-100'
  }[paymentStatus] || 'bg-gray-100 text-gray-700 hover:bg-gray-100';

  return statusText ? (
    <Badge variant="outline" className={variantClass}>
      {statusText}
    </Badge>
  ) : (
    <span>-</span>
  );
};

export default OrdersPaymentStatus;

