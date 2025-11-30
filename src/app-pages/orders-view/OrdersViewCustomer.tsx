import { IOrder } from '@/types/api.types';
import LabelValue from '@/components/common/LabelValue';

type Props = {
  order: IOrder;
};

const OrdersViewCustomer = ({ order }: Props) => {
  const address = order?.address;
  const fullAddress = address
    ? `${address.building_name || ''} ${address.street_name || ''}, ${address.area || ''}, ${address.city || ''}`
    : '-';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customer Information</h3>

      <div className="space-y-2">
        <LabelValue
          label="Name"
          value={order?.full_name || '-'}
        />
        <LabelValue
          label="Email"
          value={order?.email || '-'}
        />
        <LabelValue
          label="Phone"
          value={order?.phone_number
            ? `${order.phone_number.country_code} ${order.phone_number.number}`
            : '-'}
        />
        <LabelValue
          label="Address"
          value={fullAddress}
        />
      </div>
    </div>
  );
};

export default OrdersViewCustomer;

