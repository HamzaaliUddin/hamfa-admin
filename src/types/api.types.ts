// API Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ErrorResponseType {
  data?: {
    message?: string;
    error?: string;
  };
  message?: string;
  status?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Locale Types
export interface LocaleTextType {
  en: string;
  ar: string;
}

// Banner Types
export enum BannerStatusEnums {
  Active = 'active',
  Inactive = 'inactive'
}

export interface IBanner {
  banner_id: string | number;
  title: LocaleTextType;
  description?: LocaleTextType;
  image_url: string;
  status: BannerStatusEnums;
  created_at: string;
  updated_at: string;
}

// Brand Types
export interface IBrand {
  brand_id: string | number;
  logo:string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ICollection {
  collection_id: string | number;
  title: string;
  slug: string;
  description: string;
  image: string;
  categories_count: number;
  status: 'active' | 'inactive';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
  category_id: string | number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent_id: number | null;
  product_count: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface INotification {
  notification_id: string | number;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  status: 'sent' | 'failed' | 'scheduled';
  read: boolean;
  sent_at?: string;
  created_at: string;
  updated_at: string;
}

// Order Types
export enum OrderTypeEnums {
  Current = 'Current',
  Past = 'Delivered',
  Cancelled = 'Cancelled'
}

export enum OrderStageEnums {
  Ordered = 'Ordered',
  Preparing = 'Preparing',
  Delivering = 'Delivering',
  Delivered = 'Delivered'
}

export enum PaymentTypeEnums {
  COD = 'COD',
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

export enum PaymentStageEnums {
  Pending = 'Pending',
  Paid = 'Paid',
  Refunded = 'Refunded'
}

export interface IAddress {
  address_id?: number;
  building_name?: string;
  street_name?: string;
  zone_number?: string;
  city?: string;
  country?: string;
  area?: string;
  type?: string;
}

export interface IOrderItem {
  order_id: number;
  order_item_id: number;
  product_id: number;
  quantity: number;
  name?: LocaleTextType;
  price?: string;
  image_url?: string;
}

export interface IOrder {
  order_id: number;
  order_items: IOrderItem[];
  order_type: OrderTypeEnums;
  order_stage: OrderStageEnums;
  order_reason?: string;
  shipping_method_id?: string;
  shipping_slug?: string;
  shipping_method?: string;
  shipping_cost?: string;
  shipping_estimated_days?: string;
  shipping_name?: LocaleTextType;
  total_amount?: string;
  payment_method_text: PaymentTypeEnums;
  order_date?: string;
  created_at: string;
  updated_at?: string;
  processed_at?: string;
  dispatched_at?: string;
  delivered_at?: string;
  full_name: string;
  email?: string;
  phone_number?: {
    number: string;
    country_code: string;
  };
  address?: IAddress;
  cancelled_by?: {
    name: string;
    role: string;
    cancelled_date: string;
  };
  invoice_details?: {
    sub_total: string;
    delivery_fee: string;
    shipping_cost: string;
    grand_total: string;
  };
  refund_date?: string;
  refund_status?: string;
}

