// ============================================
// PERMISSIONS HOOKS
// ============================================

'use client';

import { useMemo } from 'react';
import { Module, Permission, AdminRole, Admin, PermissionCheckResult } from '@/types/permissions';
import { SUPER_ADMIN_PERMISSIONS } from '@/constants/permissions';

/**
 * Mock admin data - Replace with actual auth context
 * TODO: Integrate with your authentication system
 */
const mockAdmin: Admin = {
  id: '1',
  name: 'John Doe',
  email: 'admin@hamfa.com',
  role: AdminRole.SUPER_ADMIN,
  permissions: SUPER_ADMIN_PERMISSIONS,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Hook to get current admin user
 * Replace this with actual auth context
 */
export function useAdmin(): Admin | null {
  // TODO: Replace with actual auth context
  // const { admin } = useAuth();
  // return admin;
  return mockAdmin;
}

/**
 * Hook to check if current admin has a specific permission
 */
export function usePermission(module: Module, permission: Permission): boolean {
  const admin = useAdmin();

  return useMemo(() => {
    if (!admin || !admin.isActive) return false;

    // SuperAdmin has all permissions
    if (admin.role === AdminRole.SUPER_ADMIN) return true;

    // Check specific permission
    const modulePermission = admin.permissions.find(p => p.module === module);
    return modulePermission?.permissions.includes(permission) ?? false;
  }, [admin, module, permission]);
}

/**
 * Hook to check if current admin has ANY of the specified permissions
 */
export function useHasAnyPermission(module: Module, permissions: Permission[]): boolean {
  const admin = useAdmin();

  return useMemo(() => {
    if (!admin || !admin.isActive) return false;

    // SuperAdmin has all permissions
    if (admin.role === AdminRole.SUPER_ADMIN) return true;

    // Check if has any of the permissions
    const modulePermission = admin.permissions.find(p => p.module === module);
    return permissions.some(perm => modulePermission?.permissions.includes(perm)) ?? false;
  }, [admin, module, permissions]);
}

/**
 * Hook to check if current admin has ALL of the specified permissions
 */
export function useHasAllPermissions(module: Module, permissions: Permission[]): boolean {
  const admin = useAdmin();

  return useMemo(() => {
    if (!admin || !admin.isActive) return false;

    // SuperAdmin has all permissions
    if (admin.role === AdminRole.SUPER_ADMIN) return true;

    // Check if has all permissions
    const modulePermission = admin.permissions.find(p => p.module === module);
    return permissions.every(perm => modulePermission?.permissions.includes(perm)) ?? false;
  }, [admin, module, permissions]);
}

/**
 * Hook to check if current admin can access a module (has VIEW permission)
 */
export function useCanAccessModule(module: Module): boolean {
  return usePermission(module, Permission.VIEW);
}

/**
 * Hook to check if current admin is SuperAdmin
 */
export function useIsSuperAdmin(): boolean {
  const admin = useAdmin();
  return admin?.role === AdminRole.SUPER_ADMIN || false;
}

/**
 * Hook to get all accessible modules for current admin
 */
export function useAccessibleModules(): Module[] {
  const admin = useAdmin();

  return useMemo(() => {
    if (!admin || !admin.isActive) return [];

    // SuperAdmin has access to all modules
    if (admin.role === AdminRole.SUPER_ADMIN) {
      return Object.values(Module);
    }

    // Return modules where admin has VIEW permission
    return admin.permissions
      .filter(p => p.permissions.includes(Permission.VIEW))
      .map(p => p.module);
  }, [admin]);
}

/**
 * Hook to get detailed permission check with error message
 */
export function usePermissionCheck(
  module: Module,
  permission: Permission
): PermissionCheckResult {
  const hasPermission = usePermission(module, permission);

  return useMemo(() => {
    if (hasPermission) {
      return { hasPermission: true };
    }

    return {
      hasPermission: false,
      missingPermission: `You don't have ${permission} permission for ${module}`,
    };
  }, [hasPermission, module, permission]);
}

/**
 * Utility function to check permissions programmatically
 */
export function checkPermission(
  admin: Admin | null,
  module: Module,
  permission: Permission
): boolean {
  if (!admin || !admin.isActive) return false;

  // SuperAdmin has all permissions
  if (admin.role === AdminRole.SUPER_ADMIN) return true;

  // Check specific permission
  const modulePermission = admin.permissions.find(p => p.module === module);
  return modulePermission?.permissions.includes(permission) ?? false;
}

