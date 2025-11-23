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

export const users: User[] = [];

export default users;

