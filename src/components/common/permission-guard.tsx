// ============================================
// PERMISSION GUARD COMPONENT
// ============================================

'use client';

import { ReactNode } from 'react';
import { Module, Permission } from '@/types/permissions';
import { usePermission, useHasAnyPermission, useIsSuperAdmin } from '@/hooks/use-permissions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

type PermissionGuardProps = {
  module: Module;
  permission?: Permission;
  permissions?: Permission[]; // Check if has ANY of these permissions
  requireAll?: boolean; // If true, requires ALL permissions
  fallback?: ReactNode;
  children: ReactNode;
};

/**
 * Component that conditionally renders children based on permissions
 */
export function PermissionGuard({
  module,
  permission,
  permissions,
  requireAll = false,
  fallback,
  children,
}: PermissionGuardProps) {
  const isSuperAdmin = useIsSuperAdmin();
  const hasSinglePermission = usePermission(module, permission || Permission.VIEW);
  const hasAnyPermission = useHasAnyPermission(module, permissions || []);

  // SuperAdmin always has access
  if (isSuperAdmin) {
    return <>{children}</>;
  }

  // Check single permission
  if (permission && !permissions) {
    if (hasSinglePermission) {
      return <>{children}</>;
    }
  }

  // Check multiple permissions
  if (permissions && permissions.length > 0) {
    if (requireAll) {
      // Check if has all permissions (implement if needed)
      // For now, default to hasAny
      if (hasAnyPermission) {
        return <>{children}</>;
      }
    } else {
      if (hasAnyPermission) {
        return <>{children}</>;
      }
    }
  }

  // No permission - show fallback
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Alert variant="destructive" className="my-4">
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>Access Denied</AlertTitle>
      <AlertDescription>
        You don&apos;t have permission to access this resource. Contact your administrator if you
        believe this is an error.
      </AlertDescription>
    </Alert>
  );
}

/**
 * Higher-order component for permission checking
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  module: Module,
  permission: Permission
) {
  return function PermissionWrappedComponent(props: P) {
    return (
      <PermissionGuard module={module} permission={permission}>
        <Component {...props} />
      </PermissionGuard>
    );
  };
}

