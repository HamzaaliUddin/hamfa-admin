// ============================================
// ADMIN PERMISSIONS - CONSTANTS & CONFIGURATIONS
// ============================================

import { Module, Permission, ModuleConfig, AdminRole } from '@/types/permissions';

/**
 * Module configurations with metadata
 */
export const MODULE_CONFIGS: Record<Module, ModuleConfig> = {
  [Module.DASHBOARD]: {
    name: 'Dashboard',
    description: 'View analytics and overview',
    icon: 'LayoutDashboard',
    availablePermissions: [Permission.VIEW],
  },
  [Module.PRODUCTS]: {
    name: 'Products',
    description: 'Manage products, variants, and stock',
    icon: 'Package',
    availablePermissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE, Permission.DELETE],
  },
  [Module.BANNERS]: {
    name: 'Banners',
    description: 'Manage homepage banners',
    icon: 'Image',
    availablePermissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE, Permission.DELETE],
  },
  [Module.COLLECTIONS]: {
    name: 'Collections',
    description: 'Manage product collections',
    icon: 'Layers',
    availablePermissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE, Permission.DELETE],
  },
  [Module.CATEGORIES]: {
    name: 'Categories',
    description: 'Manage product categories',
    icon: 'FolderTree',
    availablePermissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE, Permission.DELETE],
  },
  [Module.BRANDS]: {
    name: 'Brands',
    description: 'Manage product brands',
    icon: 'Award',
    availablePermissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE, Permission.DELETE],
  },
  [Module.USERS]: {
    name: 'Users',
    description: 'Manage customer accounts',
    icon: 'Users',
    availablePermissions: [Permission.VIEW, Permission.UPDATE, Permission.DELETE],
  },
  [Module.ORDERS]: {
    name: 'Orders',
    description: 'Manage customer orders',
    icon: 'ShoppingCart',
    availablePermissions: [Permission.VIEW, Permission.UPDATE, Permission.DELETE],
  },
  [Module.NOTIFICATIONS]: {
    name: 'Notifications',
    description: 'Send and manage notifications',
    icon: 'Bell',
    availablePermissions: [Permission.VIEW, Permission.UPDATE, Permission.DELETE],
  },
  [Module.TERMS]: {
    name: 'Terms & Conditions',
    description: 'Manage legal documents',
    icon: 'FileText',
    availablePermissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE, Permission.DELETE],
  },
  [Module.SETTINGS]: {
    name: 'Settings',
    description: 'Configure website settings',
    icon: 'Settings',
    availablePermissions: [Permission.VIEW, Permission.UPDATE],
  },
};

/**
 * SuperAdmin has ALL permissions by default
 */
export const SUPER_ADMIN_PERMISSIONS = Object.values(Module).map(module => ({
  module,
  permissions: MODULE_CONFIGS[module].availablePermissions,
}));

/**
 * Get default permissions for a role
 */
export const getDefaultPermissionsForRole = (role: AdminRole) => {
  switch (role) {
    case AdminRole.SUPER_ADMIN:
      return SUPER_ADMIN_PERMISSIONS;
    default:
      return [];
  }
};

/**
 * Modules that require special permissions
 */
export const RESTRICTED_MODULES = [Module.SETTINGS];

/**
 * Permission display names
 */
export const PERMISSION_LABELS: Record<Permission, string> = {
  [Permission.VIEW]: 'View',
  [Permission.CREATE]: 'Create',
  [Permission.UPDATE]: 'Update',
  [Permission.DELETE]: 'Delete',
};

/**
 * Role display names
 */
export const ROLE_LABELS: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: 'Super Admin',
};

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: 'Full access to all features in admin panel',
};
