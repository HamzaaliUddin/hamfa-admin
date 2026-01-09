import { TableHeaderProps } from '@/components/Table/Table';

// Orders have: order_id, order_number, user_id, guest_session_id, guest_email, 
// subtotal, shipping, discount, total, status, payment_method, payment_status, 
// address_id, tracking_number, completed_at in backend
export const ordersColumnHeaders = (): TableHeaderProps[] => [
  {
    title: 'Order #',
    width: '10%'
  },
  {
    title: 'Date',
    width: '14%'
  },
  {
    title: 'Customer',
    width: '16%'
  },
  {
    title: 'Total',
    width: '10%',
    align: 'center'
  },
  {
    title: 'Payment',
    width: '14%',
    align: 'center'
  },
  {
    title: 'Payment Status',
    width: '13%',
    align: 'center'
  },
  {
    title: 'Order Status',
    width: '13%',
    align: 'center'
  },
  {
    title: 'Actions',
    width: '10%',
    align: 'center'
  }
];

export const geOrderPaymentTexts = (): Record<string, string> => ({
  'cod': 'Cash on Delivery',
  'card': 'Credit/Debit Card',
  'paypal': 'PayPal'
});

export const getOrderStatusColors = (): Record<string, string> => ({
  'pending': 'bg-yellow-100 text-yellow-800',
  'processing': 'bg-blue-100 text-blue-800',
  'shipped': 'bg-purple-100 text-purple-800',
  'delivered': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
  'refunded': 'bg-gray-100 text-gray-800',
});

export const getPaymentStatusColors = (): Record<string, string> => ({
  'pending': 'bg-yellow-100 text-yellow-800',
  'paid': 'bg-green-100 text-green-800',
  'failed': 'bg-red-100 text-red-800',
  'refunded': 'bg-gray-100 text-gray-800',
});
