/**
 * Application Routes Configuration
 * Centralized route management for the admin panel
 */

export const ROUTES = {
  // ==================== AUTH ROUTES ====================
  AUTH: {
    LOGIN: '/login',
    VERIFY_OTP: '/verify-otp',
    LOGOUT: '/logout',
  },

  // ==================== MAIN ROUTES ====================
  HOME: '/',
  DASHBOARD: '/dashboard',

  // ==================== ORDER ROUTES ====================
  ORDERS: {
    LIST: '/orders',
    PENDING: '/orders/pending',
    COMPLETED: '/orders/completed',
    CANCELLED: '/orders/cancelled',
    DETAIL: (id: string | number) => `/orders/view/${id}`,
    EDIT: (id: string | number) => `/orders/edit/${id}`,
  },

  // ==================== PRODUCT ROUTES ====================
  PRODUCTS: {
    LIST: '/products',
    ADD: '/products/add',
    DETAIL: (id: string | number) => `/products/${id}`,
    EDIT: (id: string | number) => `/products/edit/${id}`,
    VARIANTS: '/products/variants',
    STOCK: '/products/stock',
  },

  // ==================== CATEGORY ROUTES ====================
  CATEGORIES: {
    LIST: '/categories',
    ADD: '/categories/add',
    DETAIL: (id: string | number) => `/categories/view/${id}`,
    EDIT: (id: string | number) => `/categories/edit/${id}`,
    SUB: '/categories/sub',
    ASSIGN: '/categories/assign',
  },

  // ==================== BRAND ROUTES ====================
  BRANDS: {
    LIST: '/brands',
    ADD: '/brands/add',
    DETAIL: (id: string | number) => `/brands/view/${id}`,
    EDIT: (id: string | number) => `/brands/edit/${id}`,
  },

  // ==================== BANNER ROUTES ====================
  BANNERS: {
    LIST: '/banners',
    ADD: '/banners/add',
    DETAIL: (id: string | number) => `/banners/view/${id}`,
    EDIT: (id: string | number) => `/banners/edit/${id}`,
  },

  // ==================== COLLECTION ROUTES ====================
  COLLECTIONS: {
    LIST: '/collections',
    ADD: '/collections/add',
    DETAIL: (id: string | number) => `/collections/view/${id}`,
    EDIT: (id: string | number) => `/collections/edit/${id}`,
    ASSIGN: '/collections/assign',
  },

  // ==================== NOTIFICATION ROUTES ====================
  NOTIFICATIONS: {
    LIST: '/notifications',
    SEND: '/notifications/send',
    DETAIL: (id: string | number) => `/notifications/${id}`,
    EDIT: (id: string | number) => `/notifications/edit/${id}`,
    ANNOUNCEMENTS: '/notifications/announcements',
  },

  // ==================== USER ROUTES ====================
  USERS: {
    LIST: '/users',
    DETAILS: '/users/details',
    DETAIL: (id: string | number) => `/users/${id}`,
    EDIT: (id: string | number) => `/users/edit/${id}`,
  },

  // ==================== ADMIN ROUTES ====================
  ADMINS: {
    LIST: '/admins',
    ADD: '/admins/add',
    DETAIL: (id: string | number) => `/admins/${id}`,
    EDIT: (id: string | number) => `/admins/edit/${id}`,
    PERMISSIONS: (id: string | number) => `/admins/${id}/permissions`,
  },

  // ==================== REPORT ROUTES ====================
  REPORTS: {
    SALES: '/reports/sales',
    ORDERS: '/reports/orders',
    USERS: '/reports/users',
    PRODUCTS: '/reports/products',
  },

  // ==================== SETTINGS ROUTES ====================
  SETTINGS: {
    MAIN: '/settings/contact',
    PROFILE: '/settings/profile',
    CONTACT: '/settings/contact',
    PAYMENT: '/settings/payment',
    SOCIAL: '/settings/social',
  },

  // ==================== TERMS & CONDITIONS ROUTES ====================
  TERMS: {
    LIST: '/terms',
    ADD: '/terms/add',
    DETAIL: (id: string | number) => `/terms/${id}`,
    EDIT: (id: string | number) => `/terms/edit/${id}`,
  },
} as const;

/**
 * Helper function to build verify OTP route with query params
 */
export const buildVerifyOTPRoute = (userId: string | number, email: string) => {
  return `${ROUTES.AUTH.VERIFY_OTP}?user_id=${userId}&email=${encodeURIComponent(email)}`;
};

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.VERIFY_OTP, ROUTES.HOME] as const;

/**
 * Protected routes that require authentication
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.ORDERS.LIST,
  ROUTES.PRODUCTS.LIST,
  ROUTES.CATEGORIES.LIST,
  ROUTES.BRANDS.LIST,
  ROUTES.BANNERS.LIST,
  ROUTES.COLLECTIONS.LIST,
  ROUTES.NOTIFICATIONS.LIST,
  ROUTES.USERS.LIST,
  ROUTES.ADMINS.LIST,
  ROUTES.REPORTS.SALES,
  ROUTES.SETTINGS.MAIN,
  ROUTES.TERMS.LIST,
] as const;

/**
 * Check if a route is public
 */
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route));
};

/**
 * Check if a route is protected
 */
export const isProtectedRoute = (pathname: string): boolean => {
  return !isPublicRoute(pathname);
};

/**
 * Navigation helper utilities
 */
export const NavigationHelper = {
  /**
   * Navigate to login
   */
  toLogin: () => ROUTES.AUTH.LOGIN,

  /**
   * Navigate to verify OTP with params
   */
  toVerifyOTP: (userId: string | number, email: string) => buildVerifyOTPRoute(userId, email),

  /**
   * Navigate to dashboard
   */
  toDashboard: () => ROUTES.DASHBOARD,

  /**
   * Navigate to order detail
   */
  toOrderDetail: (id: string | number) => ROUTES.ORDERS.DETAIL(id),

  /**
   * Navigate to product detail
   */
  toProductDetail: (id: string | number) => ROUTES.PRODUCTS.DETAIL(id),

  /**
   * Navigate to user detail
   */
  toUserDetail: (id: string | number) => ROUTES.USERS.DETAIL(id),

  /**
   * Navigate to admin detail
   */
  toAdminDetail: (id: string | number) => ROUTES.ADMINS.DETAIL(id),

  /**
   * Navigate to category detail
   */
  toCategoryDetail: (id: string | number) => ROUTES.CATEGORIES.DETAIL(id),

  /**
   * Navigate to brand detail
   */
  toBrandDetail: (id: string | number) => ROUTES.BRANDS.DETAIL(id),

  /**
   * Navigate to collection detail
   */
  toCollectionDetail: (id: string | number) => ROUTES.COLLECTIONS.DETAIL(id),
} as const;

export default ROUTES;
