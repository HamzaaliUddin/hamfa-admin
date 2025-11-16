interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const authUtils = {
  // Save auth token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
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
      window.location.href = '/login';
    }
  },
};

