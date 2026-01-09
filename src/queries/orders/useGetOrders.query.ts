'use client';

import axiosInstance from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Order status enum matching backend
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Payment method enum matching backend
export type PaymentMethod = 'card' | 'paypal' | 'cod';

// Payment status enum matching backend
export type PaymentStatus = 'paid' | 'pending' | 'failed';

// Order item interface matching backend
export interface OrderItem {
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
}

// Address interface matching backend
export interface Address {
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
}

export interface Order {
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
  // Joined data (optional)
  items?: OrderItem[];
  address?: Address;
  user?: {
    user_id: number;
    name: string;
    email: string;
  };
}

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  sortKey?: string;
  sortValue?: 'ASC' | 'DESC';
  status?: string;
  payment_status?: string;
  payment_method?: string;
  user_id?: number;
  search?: string;
}

interface GetOrdersResponse {
  data: Order[];
  count: number;
}

const fetchOrders = async (params?: GetOrdersParams): Promise<GetOrdersResponse> => {
  return await axiosInstance.get('/order', { params });
};

export const useGetOrders = (params?: GetOrdersParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    staleTime: 60 * 1000,
  });
};
