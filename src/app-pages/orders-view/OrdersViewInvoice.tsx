import { Separator } from '@/components/ui/separator';
import { IOrder } from '@/types/api.types';
import LabelValue from '@/components/common/LabelValue';

type Props = {
  invoice: IOrder['invoice_details'];
};

const OrdersViewInvoice = ({ invoice }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Invoice Details</h3>

      <div className="space-y-2">
        <LabelValue
          label="Delivery Fee"
          value={`QAR ${invoice?.delivery_fee || '0.00'}`}
        />
        <LabelValue
          label="Sub Total"
          value={`QAR ${invoice?.sub_total || '0.00'}`}
        />

        <Separator />

        <LabelValue
          label="Grand Total"
          value={`QAR ${invoice?.grand_total || '0.00'}`}
          className="text-lg font-semibold"
        />
      </div>
    </div>
  );
};

export default OrdersViewInvoice;

