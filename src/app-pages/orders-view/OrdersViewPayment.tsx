import { Order } from '@/queries/orders/useGetOrders.query';
import LabelValue from '@/components/common/LabelValue';
import { geOrderPaymentTexts } from '../orders/Orders.helper';

type Props = {
  order?: Order;
};

const OrdersViewPayment = ({ order }: Props) => {
  const paymentTexts = geOrderPaymentTexts();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Information</h3>

      <div className="space-y-2">
        <LabelValue
          label="Payment Method"
          value={paymentTexts[order?.payment_method || 'cod'] || '-'}
        />
        <LabelValue
          label="Payment Status"
          value={order?.payment_status || 'Pending'}
        />
      </div>
    </div>
  );
};

export default OrdersViewPayment;

