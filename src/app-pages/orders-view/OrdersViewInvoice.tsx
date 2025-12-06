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
          label="Delivery Fee"
          value={`QAR ${order?.shipping || '0.00'}`}
        />
        <LabelValue
          label="Tax"
          value={`QAR ${order?.tax || '0.00'}`}
        />
        <LabelValue
          label="Discount"
          value={`QAR ${order?.discount || '0.00'}`}
        />
        <LabelValue
          label="Sub Total"
          value={`QAR ${order?.subtotal || '0.00'}`}
        />

        <Separator />

        <LabelValue
          label="Grand Total"
          value={`QAR ${order?.total || '0.00'}`}
          className="text-lg font-semibold"
        />
      </div>
    </div>
  );
};

export default OrdersViewInvoice;

