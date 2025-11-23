// ============================================
// ORDERS MOCK DATA
// ============================================

export type OrderItem = {
  id: string;
  productId: string;
  title: string;
  sku: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'paypal' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export const orders: Order[] = [];

export default orders;

