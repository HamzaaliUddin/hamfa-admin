import { Badge } from '@/components/ui/badge';
import { IOrder, OrderStageEnums, OrderTypeEnums } from '@/types/api.types';
import { getOrderStatusText } from './Orders.helper';

type Props = {
  row: IOrder;
};

const OrdersDeliveryStatus = ({ row }: Props) => {
  const status =
    row?.order_type === OrderTypeEnums.Cancelled
      ? OrderTypeEnums.Cancelled
      : row?.order_stage;

  const statusText = getOrderStatusText()[status];
  
  const variantClass = {
    [OrderStageEnums.Ordered]: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
    [OrderStageEnums.Preparing]: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
    [OrderStageEnums.Delivering]: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    [OrderStageEnums.Delivered]: 'bg-green-100 text-green-700 hover:bg-green-100',
    [OrderTypeEnums.Cancelled]: 'bg-red-100 text-red-700 hover:bg-red-100'
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

