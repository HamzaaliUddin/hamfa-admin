// ============================================
// USERS TYPES - Matching Backend Models
// ============================================

export type User = {
  user_id: number;
  name: string;
  email: string;
  role_id: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // Joined data
  role?: {
    role_id: number;
    name: string;
    description?: string;
  };
};

export const users: User[] = [];

export default users;
