export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  ORDERS_PENDING: '/orders/pending',
  ORDERS_COMPLETED: '/orders/completed',
  ORDERS_CANCELLED: '/orders/cancelled',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  PRODUCT_VARIANTS: '/products/variants',
  PRODUCT_STOCK: '/products/stock',

  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  SUB_CATEGORIES: '/categories/sub',
  ASSIGN_CATEGORIES: '/categories/assign',

  // Brands
  BRANDS: '/brands',
  BRAND_BY_ID: (id: string) => `/brands/${id}`,

  // Banners
  BANNERS: '/banners',
  BANNER_BY_ID: (id: string) => `/banners/${id}`,

  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_BY_ID: (id: string) => `/notifications/${id}`,
  SEND_NOTIFICATION: '/notifications/send',
  ANNOUNCEMENTS: '/notifications/announcements',

  // Users
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  BLOCK_USER: (id: string) => `/users/${id}/block`,
  UNBLOCK_USER: (id: string) => `/users/${id}/unblock`,

  // Reports
  SALES_REPORT: '/reports/sales',
  ORDER_REPORT: '/reports/orders',
  USER_GROWTH_REPORT: '/reports/users',
  PRODUCT_PERFORMANCE: '/reports/products',

  // Settings
  SETTINGS: '/settings',
  CONTACT_SETTINGS: '/settings/contact',
  PAYMENT_SETTINGS: '/settings/payment',
  SOCIAL_SETTINGS: '/settings/social',
  SEO_SETTINGS: '/settings/seo',
  ADMIN_PROFILE: '/settings/profile',

  // Collections
  COLLECTIONS: '/collections',
  COLLECTION_BY_ID: (id: string) => `/collections/${id}`,
  ASSIGN_PRODUCTS: '/collections/assign',

  // Terms & Conditions
  TERMS: '/terms',
  TERM_BY_ID: (id: string) => `/terms/${id}`,

  // Admin Management
  ADMINS: '/admins',
  ADMIN_BY_ID: (id: string) => `/admins/${id}`,
  ADMIN_PERMISSIONS: (id: string) => `/admins/${id}/permissions`,
};

export const ROUTES = {
  // Auth
  LOGIN: '/login',

  // Main
  DASHBOARD: '/dashboard',

  // Orders
  ORDERS: '/orders',
  ORDERS_PENDING: '/orders/pending',
  ORDERS_COMPLETED: '/orders/completed',
  ORDERS_CANCELLED: '/orders/cancelled',
  ORDER_DETAILS: (id: string) => `/orders/${id}`,
  ORDERS_EDIT: (id: string) => `/orders/edit/${id}`,

  // Products
  PRODUCTS: '/products',
  PRODUCTS_ADD: '/products/add',
  PRODUCTS_EDIT: (id: string) => `/products/edit/${id}`,
  PRODUCTS_VARIANTS: '/products/variants',
  PRODUCTS_STOCK: '/products/stock',

  // Categories
  CATEGORIES: '/categories',
  CATEGORIES_SUB: '/categories/sub',
  CATEGORIES_ASSIGN: '/categories/assign',

  // Brands
  BRANDS: '/brands',
  BRANDS_ADD: '/brands/add',
  BRANDS_EDIT: (id: string) => `/brands/edit/${id}`,

  // Banners
  BANNERS: '/banners',
  BANNERS_ADD: '/banners/add',
  BANNERS_EDIT: (id: string) => `/banners/edit/${id}`,

  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATIONS_SEND: '/notifications/send',
  NOTIFICATIONS_EDIT: (id: string) => `/notifications/edit/${id}`,
  NOTIFICATIONS_ANNOUNCEMENTS: '/notifications/announcements',

  // Users
  USERS: '/users',
  USERS_DETAILS: '/users/details',
  USER_PROFILE: (id: string) => `/users/${id}`,
  USERS_EDIT: (id: string) => `/users/edit/${id}`,

  // Reports
  REPORTS_SALES: '/reports/sales',
  REPORTS_ORDERS: '/reports/orders',
  REPORTS_USERS: '/reports/users',
  REPORTS_PRODUCTS: '/reports/products',

  // Settings
  SETTINGS: '/settings',
  SETTINGS_CONTACT: '/settings/contact',
  SETTINGS_PAYMENT: '/settings/payment',
  SETTINGS_SOCIAL: '/settings/social',
  SETTINGS_SEO: '/settings/seo',
  SETTINGS_PROFILE: '/settings/profile',

  // Collections
  COLLECTIONS: '/collections',
  COLLECTIONS_ADD: '/collections/add',
  COLLECTIONS_EDIT: (id: string) => `/collections/edit/${id}`,
  COLLECTIONS_ASSIGN: '/collections/assign',

  // Terms & Conditions
  TERMS: '/terms',
  TERMS_ADD: '/terms/add',
  TERMS_EDIT: (id: string) => `/terms/edit/${id}`,

  // Admin Management
  ADMINS: '/admins',
  ADMINS_ADD: '/admins/add',
  ADMINS_EDIT: (id: string) => `/admins/edit/${id}`,
  ADMINS_PERMISSIONS: (id: string) => `/admins/${id}/permissions`,
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock',
} as const;
