import { Separator } from '@/components/ui/separator';
import { Order } from '@/queries/orders/useGetOrders.query';
import LabelValue from '@/components/common/LabelValue';

type Props = {
  order?: Order;
};

const OrdersViewInvoice = ({ order }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Invoice Details</h3>

      <div className="space-y-2">
        <LabelValue
          label="Subtotal"
          value={`Rs ${order?.subtotal || '0.00'}`}
        />
        <LabelValue
          label="Shipping"
          value={`Rs ${order?.shipping || '0.00'}`}
        />
        <LabelValue
          label="Discount"
          value={`Rs ${order?.discount || '0.00'}`}
        />

        <Separator />

        <LabelValue
          label="Total"
          value={`Rs ${order?.total || '0.00'}`}
          className="text-lg font-semibold"
        />
      </div>
    </div>
  );
};

export default OrdersViewInvoice;
