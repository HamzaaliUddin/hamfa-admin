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

export const authUtils = {
  // Save auth token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
      // Also set in cookie for middleware
      document.cookie = `admin_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
    }
  },

  // Get auth token
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  },

  // Remove auth token
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      // Also remove from cookie
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  // Save user data
  setUser: (user: AdminUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_user', JSON.stringify(user));
    }
  },

  // Get user data
  getUser: (): AdminUser | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('admin_user');
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
      localStorage.removeItem('admin_user');
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
      // Also remove refresh token and expiry
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('token_expires_in');
      // Remove cookie
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.href = '/login';
    }
  },
};

