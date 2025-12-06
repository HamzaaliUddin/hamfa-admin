import { Order } from '@/queries/orders/useGetOrders.query';
import LabelValue from '@/components/common/LabelValue';

type Props = {
  order?: Order;
};

const OrdersViewCustomer = ({ order }: Props) => {
  // Parse shipping address if it's a JSON string
  let shippingAddress = null;
  try {
    shippingAddress = typeof order?.shipping_address === 'string' 
      ? JSON.parse(order.shipping_address) 
      : order?.shipping_address;
  } catch (e) {
    shippingAddress = null;
  }

  const fullAddress = shippingAddress
    ? `${shippingAddress.street || ''}, ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}, ${shippingAddress.country || ''}`
    : '-';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customer Information</h3>

      <div className="space-y-2">
        <LabelValue
          label="User ID"
          value={order?.user_id?.toString() || '-'}
        />
        <LabelValue
          label="Shipping Address"
          value={fullAddress}
        />
      </div>
    </div>
  );
};

export default OrdersViewCustomer;

