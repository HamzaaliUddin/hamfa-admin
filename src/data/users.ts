// ============================================
// USERS MOCK DATA
// ============================================

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'moderator';
  status: 'active' | 'blocked' | 'inactive';
  emailVerified: boolean;
  phoneVerified: boolean;
  totalOrders: number;
  totalSpent: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
};

export const users: User[] = [
  {
    id: 'u1',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    phone: '+92-300-1234567',
    avatar: '/avatars/user-1.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 12,
    totalSpent: 4599.99,
    address: {
      street: '123 Main Street, Block A',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75500',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-15T10:30:00',
    createdAt: '2023-06-15',
    updatedAt: '2024-02-15',
  },
  {
    id: 'u2',
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    phone: '+92-301-7654321',
    avatar: '/avatars/user-2.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 8,
    totalSpent: 2899.50,
    address: {
      street: '456 Garden Road',
      city: 'Lahore',
      state: 'Punjab',
      zip: '54000',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-14T18:45:00',
    createdAt: '2023-08-20',
    updatedAt: '2024-02-14',
  },
  {
    id: 'u3',
    name: 'Hassan Malik',
    email: 'hassan@example.com',
    phone: '+92-333-9876543',
    avatar: '/avatars/user-3.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: false,
    totalOrders: 5,
    totalSpent: 1599.75,
    address: {
      street: '789 University Avenue',
      city: 'Islamabad',
      state: 'ICT',
      zip: '44000',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-13T14:20:00',
    createdAt: '2023-09-10',
    updatedAt: '2024-02-13',
  },
  {
    id: 'u4',
    name: 'Ayesha Siddiqui',
    email: 'ayesha@example.com',
    phone: '+92-321-5551234',
    avatar: '/avatars/user-4.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 15,
    totalSpent: 6299.00,
    address: {
      street: '321 Beach Road',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75600',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-15T09:15:00',
    createdAt: '2023-05-05',
    updatedAt: '2024-02-15',
  },
  {
    id: 'u5',
    name: 'Bilal Ahmed',
    email: 'bilal@example.com',
    phone: '+92-345-7778888',
    role: 'customer',
    status: 'blocked',
    emailVerified: false,
    phoneVerified: false,
    totalOrders: 2,
    totalSpent: 299.99,
    address: {
      street: '555 Mall Road',
      city: 'Rawalpindi',
      state: 'Punjab',
      zip: '46000',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-10T16:30:00',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-12',
  },
  {
    id: 'u6',
    name: 'Zainab Hassan',
    email: 'zainab@example.com',
    phone: '+92-322-1112222',
    avatar: '/avatars/user-6.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 10,
    totalSpent: 3899.25,
    address: {
      street: '777 Canal Road',
      city: 'Faisalabad',
      state: 'Punjab',
      zip: '38000',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-14T11:00:00',
    createdAt: '2023-07-18',
    updatedAt: '2024-02-14',
  },
  {
    id: 'u7',
    name: 'Usman Ali',
    email: 'usman@example.com',
    phone: '+92-334-3334444',
    avatar: '/avatars/user-7.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 7,
    totalSpent: 2199.50,
    lastLogin: '2024-02-13T19:25:00',
    createdAt: '2023-10-12',
    updatedAt: '2024-02-13',
  },
  {
    id: 'u8',
    name: 'Maryam Khan',
    email: 'maryam@example.com',
    phone: '+92-323-5556666',
    avatar: '/avatars/user-8.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: false,
    totalOrders: 3,
    totalSpent: 899.99,
    lastLogin: '2024-02-12T08:45:00',
    createdAt: '2023-11-25',
    updatedAt: '2024-02-12',
  },
  {
    id: 'u9',
    name: 'Ali Raza',
    email: 'aliraza@example.com',
    phone: '+92-335-7778889',
    role: 'customer',
    status: 'inactive',
    emailVerified: false,
    phoneVerified: false,
    totalOrders: 0,
    totalSpent: 0,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: 'u10',
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    phone: '+92-346-9990000',
    avatar: '/avatars/user-10.jpg',
    role: 'customer',
    status: 'active',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 18,
    totalSpent: 7899.99,
    address: {
      street: '999 Defense Road',
      city: 'Lahore',
      state: 'Punjab',
      zip: '54792',
      country: 'Pakistan',
    },
    lastLogin: '2024-02-15T12:00:00',
    createdAt: '2023-04-10',
    updatedAt: '2024-02-15',
  },
];

export default users;

