import dayjs from 'dayjs';
import { IOrder } from '@/types/api.types';

type Props = {
  order: IOrder;
};

const OrdersViewInfo = ({ order }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Information</h3>
      
      <div>
        <p className="text-sm font-medium">Order Date</p>
        <p className="text-sm text-muted-foreground">
          {order?.created_at
            ? dayjs(order?.created_at).format('DD MMM YYYY, hh:mm:ss A')
            : '-'}
        </p>
      </div>

      {order?.processed_at && (
        <div>
          <p className="text-sm font-medium">Processed Date</p>
          <p className="text-sm text-muted-foreground">
            {dayjs(order?.processed_at).format('DD MMM YYYY, hh:mm:ss A')}
          </p>
        </div>
      )}

      {order?.dispatched_at && (
        <div>
          <p className="text-sm font-medium">Dispatched Date</p>
          <p className="text-sm text-muted-foreground">
            {dayjs(order?.dispatched_at).format('DD MMM YYYY, hh:mm:ss A')}
          </p>
        </div>
      )}

      {order?.delivered_at && (
        <div>
          <p className="text-sm font-medium">Delivered Date</p>
          <p className="text-sm text-muted-foreground">
            {dayjs(order?.delivered_at).format('DD MMM YYYY, hh:mm:ss A')}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersViewInfo;

