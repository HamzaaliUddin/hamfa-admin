import { IOrder } from '@/types/api.types';
import LabelValue from '@/components/common/LabelValue';
import { geOrderPaymentTexts } from '../orders/Orders.helper';

type Props = {
  order: IOrder;
};

const OrdersViewPayment = ({ order }: Props) => {
  const paymentTexts = geOrderPaymentTexts();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Information</h3>

      <div className="space-y-2">
        <LabelValue
          label="Payment Method"
          value={paymentTexts[order?.payment_method_text] || '-'}
        />
        <LabelValue
          label="Payment Status"
          value={order?.refund_status || 'Pending'}
        />
        {order?.refund_date && (
          <LabelValue
            label="Refund Date"
            value={order?.refund_date}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersViewPayment;

