import Cookies from 'js-cookie';

interface AdminUser {
  user_id: number;
  name: string;
  email: string;
  role: {
    role_id: number;
    name: string;
    permissions?: Array<{
      permission_id: number;
      module: string;
      action: string;
      description: string;
    }>;
  };
  brand?: {
    brand_id: number;
    name: string;
  };
}

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export const authUtils = {
  // Save auth token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      Cookies.set(TOKEN_KEY, token, {
        expires: 30, // 30 days
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    }
  },

  // Get auth token from cookies
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return Cookies.get(TOKEN_KEY) || null;
    }
    return null;
  },

  // Remove auth token
  removeToken: () => {
    if (typeof window !== 'undefined') {
      Cookies.remove(TOKEN_KEY, { path: '/' });
    }
  },

  // Save user data (keeping in localStorage for now, can be moved to cookies if needed)
  setUser: (user: AdminUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Get user data
  getUser: (): AdminUser | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  // Remove user data
  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authUtils.getToken();
  },

  // Logout
  logout: () => {
    authUtils.removeToken();
    authUtils.removeUser();
    if (typeof window !== 'undefined') {
      // Also remove refresh token and expiry if they exist
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('token_expires_in');
      window.location.href = '/login';
    }
  },
};
