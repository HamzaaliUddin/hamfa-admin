import { Badge } from '@/components/ui/badge';
import { IOrder, OrderStageEnums, OrderTypeEnums, PaymentStageEnums, PaymentTypeEnums } from '@/types/api.types';

type Props = {
  row: IOrder;
};

const OrdersPaymentStatus = ({ row }: Props) => {
  const isCODNotDelivered =
    row.payment_method_text === PaymentTypeEnums.COD &&
    row.order_stage !== OrderStageEnums.Delivered &&
    row.order_type !== OrderTypeEnums.Cancelled;

  const paymentStatus = isCODNotDelivered
    ? PaymentStageEnums.Pending
    : row?.refund_status || PaymentStageEnums.Pending;

  const statusText = {
    [PaymentStageEnums.Pending]: 'Pending Payment',
    [PaymentStageEnums.Paid]: 'Fully Paid',
    [PaymentStageEnums.Refunded]: 'Refunded'
  }[paymentStatus as PaymentStageEnums];

  const variantClass = {
    [PaymentStageEnums.Pending]: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
    [PaymentStageEnums.Paid]: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    [PaymentStageEnums.Refunded]: 'bg-gray-100 text-gray-700 hover:bg-gray-100'
  }[paymentStatus as PaymentStageEnums] || 'bg-gray-100 text-gray-700 hover:bg-gray-100';

  return statusText ? (
    <Badge variant="outline" className={variantClass}>
      {statusText}
    </Badge>
  ) : (
    <span>-</span>
  );
};

export default OrdersPaymentStatus;

