// ============================================
// ADMIN PERMISSIONS SYSTEM - TYPE DEFINITIONS
// ============================================

/**
 * Available modules in the admin panel
 */
export enum Module {
  DASHBOARD = 'dashboard',
  PRODUCTS = 'products',
  BANNERS = 'banners',
  COLLECTIONS = 'collections',
  CATEGORIES = 'categories',
  BRANDS = 'brands',
  USERS = 'users',
  ORDERS = 'orders',
  NOTIFICATIONS = 'notifications',
  TERMS = 'terms',
  ADMIN_MANAGEMENT = 'admin_management',
  SETTINGS = 'settings',
}

/**
 * CRUD operations for each module
 */
export enum Permission {
  VIEW = 'view',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

/**
 * Admin roles
 */
export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

/**
 * Permission entry for a specific module
 */
export type ModulePermission = {
  module: Module;
  permissions: Permission[];
};

/**
 * Complete admin user type
 */
export type Admin = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: ModulePermission[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  avatar?: string;
};

/**
 * Permission check result
 */
export type PermissionCheckResult = {
  hasPermission: boolean;
  missingPermission?: string;
};

/**
 * Module configuration with metadata
 */
export type ModuleConfig = {
  name: string;
  description: string;
  icon: string;
  availablePermissions: Permission[];
};

/**
 * Form data for creating/updating admin
 */
export type AdminFormData = {
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  permissions: ModulePermission[];
  isActive: boolean;
};

/**
 * Permission matrix for easy permission management
 */
export type PermissionMatrix = {
  [key in Module]?: Permission[];
};

