// ============================================
// ORDERS TYPES - Matching Backend Models
// ============================================

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'paypal' | 'cod';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

export type OrderItem = {
  order_item_id: number;
  order_id: number;
  product_id: number;
  title: string;
  sku: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
  size?: string;
  created_at?: string;
  updated_at?: string;
};

export type Address = {
  address_id: number;
  user_id?: number;
  name: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  address_type: 'home' | 'office' | 'other';
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Order = {
  order_id: number;
  order_number: string;
  user_id?: number;
  guest_session_id?: string;
  guest_email?: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  address_id?: number;
  tracking_number?: string;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
  // Joined data
  items?: OrderItem[];
  address?: Address;
  user?: {
    user_id: number;
    name: string;
    email: string;
  };
};

export const orders: Order[] = [];

export default orders;
