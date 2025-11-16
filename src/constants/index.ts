export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  
  // Brands
  BRANDS: '/brands',
  BRAND_BY_ID: (id: string) => `/brands/${id}`,
  
  // Banners
  BANNERS: '/banners',
  BANNER_BY_ID: (id: string) => `/banners/${id}`,
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_BY_ID: (id: string) => `/notifications/${id}`,
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  ORDERS: '/orders',
  BRANDS: '/brands',
  BANNERS: '/banners',
  NOTIFICATIONS: '/notifications',
};

