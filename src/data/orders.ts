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

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-1001',
    customer: {
      id: 'u1',
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      phone: '+92-300-1234567',
    },
    items: [
      {
        id: 'oi1',
        productId: '1',
        title: 'Premium Leather Jacket',
        sku: 'LJ-001',
        image: '/products/jacket-1.jpg',
        quantity: 1,
        price: 299.99,
        total: 299.99,
      },
      {
        id: 'oi2',
        productId: '2',
        title: 'Wireless Bluetooth Headphones',
        sku: 'WH-001',
        image: '/products/headphones-1.jpg',
        quantity: 2,
        price: 149.99,
        total: 299.98,
      },
    ],
    subtotal: 599.97,
    tax: 60.00,
    shipping: 15.00,
    discount: 0,
    total: 674.97,
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    shippingAddress: {
      street: '123 Main Street, Block A',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75500',
      country: 'Pakistan',
    },
    billingAddress: {
      street: '123 Main Street, Block A',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75500',
      country: 'Pakistan',
    },
    notes: 'Please call before delivery',
    createdAt: '2024-02-15T10:30:00',
    updatedAt: '2024-02-15T10:30:00',
  },
  {
    id: '2',
    orderNumber: 'ORD-1002',
    customer: {
      id: 'u2',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      phone: '+92-301-7654321',
    },
    items: [
      {
        id: 'oi3',
        productId: '3',
        title: 'Smart Fitness Watch',
        sku: 'FW-001',
        image: '/products/watch-1.jpg',
        quantity: 1,
        price: 199.99,
        total: 199.99,
      },
    ],
    subtotal: 199.99,
    tax: 20.00,
    shipping: 10.00,
    discount: 30.00,
    total: 199.99,
    status: 'processing',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 Garden Road',
      city: 'Lahore',
      state: 'Punjab',
      zip: '54000',
      country: 'Pakistan',
    },
    billingAddress: {
      street: '456 Garden Road',
      city: 'Lahore',
      state: 'Punjab',
      zip: '54000',
      country: 'Pakistan',
    },
    trackingNumber: 'TRK-ABC123456',
    createdAt: '2024-02-14T14:20:00',
    updatedAt: '2024-02-15T09:00:00',
  },
  {
    id: '3',
    orderNumber: 'ORD-1003',
    customer: {
      id: 'u3',
      name: 'Hassan Malik',
      email: 'hassan@example.com',
      phone: '+92-333-9876543',
    },
    items: [
      {
        id: 'oi4',
        productId: '5',
        title: 'Running Shoes',
        sku: 'RS-001',
        image: '/products/shoes-1.jpg',
        quantity: 2,
        price: 89.99,
        total: 179.98,
      },
      {
        id: 'oi5',
        productId: '4',
        title: 'Cotton T-Shirt Pack',
        sku: 'TS-001',
        image: '/products/tshirt-1.jpg',
        quantity: 1,
        price: 39.99,
        total: 39.99,
      },
    ],
    subtotal: 219.97,
    tax: 22.00,
    shipping: 12.00,
    discount: 0,
    total: 253.97,
    status: 'shipped',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '789 University Avenue',
      city: 'Islamabad',
      state: 'ICT',
      zip: '44000',
      country: 'Pakistan',
    },
    billingAddress: {
      street: '789 University Avenue',
      city: 'Islamabad',
      state: 'ICT',
      zip: '44000',
      country: 'Pakistan',
    },
    trackingNumber: 'TRK-XYZ789012',
    createdAt: '2024-02-13T11:15:00',
    updatedAt: '2024-02-14T16:30:00',
  },
  {
    id: '4',
    orderNumber: 'ORD-1004',
    customer: {
      id: 'u4',
      name: 'Ayesha Siddiqui',
      email: 'ayesha@example.com',
      phone: '+92-321-5551234',
    },
    items: [
      {
        id: 'oi6',
        productId: '10',
        title: 'Sunglasses UV Protection',
        sku: 'SG-001',
        image: '/products/sunglasses-1.jpg',
        quantity: 1,
        price: 79.99,
        total: 79.99,
      },
    ],
    subtotal: 79.99,
    tax: 8.00,
    shipping: 8.00,
    discount: 0,
    total: 95.99,
    status: 'delivered',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '321 Beach Road',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75600',
      country: 'Pakistan',
    },
    billingAddress: {
      street: '321 Beach Road',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75600',
      country: 'Pakistan',
    },
    trackingNumber: 'TRK-DEF456789',
    createdAt: '2024-02-10T09:00:00',
    updatedAt: '2024-02-13T14:20:00',
    completedAt: '2024-02-13T14:20:00',
  },
  {
    id: '5',
    orderNumber: 'ORD-1005',
    customer: {
      id: 'u5',
      name: 'Bilal Ahmed',
      email: 'bilal@example.com',
      phone: '+92-345-7778888',
    },
    items: [
      {
        id: 'oi7',
        productId: '8',
        title: 'Gaming Mouse',
        sku: 'GM-001',
        image: '/products/mouse-1.jpg',
        quantity: 1,
        price: 59.99,
        total: 59.99,
      },
      {
        id: 'oi8',
        productId: '6',
        title: 'Laptop Backpack',
        sku: 'BP-001',
        image: '/products/backpack-1.jpg',
        quantity: 1,
        price: 49.99,
        total: 49.99,
      },
    ],
    subtotal: 109.98,
    tax: 11.00,
    shipping: 10.00,
    discount: 20.00,
    total: 110.98,
    status: 'cancelled',
    paymentMethod: 'cod',
    paymentStatus: 'failed',
    shippingAddress: {
      street: '555 Mall Road',
      city: 'Rawalpindi',
      state: 'Punjab',
      zip: '46000',
      country: 'Pakistan',
    },
    billingAddress: {
      street: '555 Mall Road',
      city: 'Rawalpindi',
      state: 'Punjab',
      zip: '46000',
      country: 'Pakistan',
    },
    notes: 'Customer cancelled - out of stock',
    createdAt: '2024-02-12T13:45:00',
    updatedAt: '2024-02-13T10:00:00',
  },
];

export default orders;

