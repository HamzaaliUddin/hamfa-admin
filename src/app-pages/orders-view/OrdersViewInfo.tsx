import dayjs from 'dayjs';
import { Order } from '@/queries/orders/useGetOrders.query';

type Props = {
  order?: Order;
};

const OrdersViewInfo = ({ order }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Information</h3>
      
      <div>
        <p className="text-sm font-medium">Order Number</p>
        <p className="text-sm text-muted-foreground">
          {order?.order_number || '-'}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">Order Date</p>
        <p className="text-sm text-muted-foreground">
          {order?.created_at
            ? dayjs(order?.created_at).format('DD MMM YYYY, hh:mm:ss A')
            : '-'}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">Status</p>
        <p className="text-sm text-muted-foreground capitalize">
          {order?.status || '-'}
        </p>
      </div>

      {order?.tracking_number && (
        <div>
          <p className="text-sm font-medium">Tracking Number</p>
          <p className="text-sm text-muted-foreground">
            {order?.tracking_number}
          </p>
        </div>
      )}

      {order?.completed_at && (
        <div>
          <p className="text-sm font-medium">Completed Date</p>
          <p className="text-sm text-muted-foreground">
            {dayjs(order?.completed_at).format('DD MMM YYYY, hh:mm:ss A')}
          </p>
        </div>
      )}

      {order?.notes && (
        <div>
          <p className="text-sm font-medium">Notes</p>
          <p className="text-sm text-muted-foreground">
            {order?.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersViewInfo;

