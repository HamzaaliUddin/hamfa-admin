import { Order } from '@/queries/orders/useGetOrders.query';
import LabelValue from '@/components/common/LabelValue';

type Props = {
  order?: Order;
};

const OrdersViewCustomer = ({ order }: Props) => {
  const address = order?.address;

  const fullAddress = address
    ? `${address.street_address || ''}, ${address.city || ''}, ${address.state || ''} ${address.postal_code || ''}, ${address.country || ''}`
    : '-';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customer Information</h3>

      <div className="space-y-2">
        <LabelValue
          label="Customer"
          value={order?.user?.name || order?.guest_email || `Guest #${order?.guest_session_id?.slice(0, 8)}` || '-'}
        />
        <LabelValue
          label="Email"
          value={order?.user?.email || order?.guest_email || '-'}
        />
        {address && (
          <>
            <LabelValue
              label="Contact Name"
              value={address.name || '-'}
            />
            <LabelValue
              label="Phone"
              value={address.phone || '-'}
            />
            <LabelValue
              label="Address"
              value={fullAddress}
            />
            <LabelValue
              label="Address Type"
              value={address.address_type || '-'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersViewCustomer;
