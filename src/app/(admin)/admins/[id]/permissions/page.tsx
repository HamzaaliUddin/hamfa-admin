'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CrudLayout } from '@/components/common/crud-layout';
import {
  Module,
  Permission,
  ModulePermission,
  AdminRole,
} from '@/types/permissions';
import { MODULE_CONFIGS, PERMISSION_LABELS } from '@/constants/permissions';
import { useIsSuperAdmin } from '@/hooks/use-permissions';
import { Shield } from 'lucide-react';

type AdminWithPermissions = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: ModulePermission[];
};

// Mock data
const mockAdmin: AdminWithPermissions = {
  id: '2',
  name: 'Jane Smith',
  email: 'jane@hamfa.com',
  role: AdminRole.ADMIN,
  permissions: [
    { module: Module.DASHBOARD, permissions: [Permission.VIEW] },
    { module: Module.PRODUCTS, permissions: [Permission.VIEW, Permission.CREATE, Permission.UPDATE] },
    { module: Module.ORDERS, permissions: [Permission.VIEW, Permission.UPDATE] },
  ],
};

export default function AdminPermissionsPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isSuperAdmin = useIsSuperAdmin();
  const [admin] = useState<AdminWithPermissions>(mockAdmin);
  const [permissions, setPermissions] = useState<ModulePermission[]>(admin.permissions);

  const hasPermission = (module: Module, permission: Permission) => {
    const modulePerms = permissions.find(p => p.module === module);
    return modulePerms?.permissions.includes(permission) ?? false;
  };

  const togglePermission = (module: Module, permission: Permission) => {
    setPermissions(prev => {
      const existing = prev.find(p => p.module === module);

      if (!existing) {
        // Add new module with permission
        return [...prev, { module, permissions: [permission] }];
      }

      const hasIt = existing.permissions.includes(permission);

      if (hasIt) {
        // Remove permission
        const newPerms = existing.permissions.filter(p => p !== permission);
        if (newPerms.length === 0) {
          // Remove module if no permissions left
          return prev.filter(p => p.module !== module);
        }
        return prev.map(p => (p.module === module ? { ...p, permissions: newPerms } : p));
      } else {
        // Add permission
        return prev.map(p =>
          p.module === module ? { ...p, permissions: [...p.permissions, permission] } : p
        );
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    // TODO: API call to update permissions
    setTimeout(() => {
      setLoading(false);
      router.push('/admins');
    }, 1000);
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">You don&apos;t have permission to manage admin permissions.</p>
      </div>
    );
  }

  return (
    <CrudLayout
      title={`Manage Permissions - ${admin.name}`}
      description={admin.email}
      backButton={{
        label: 'Back to Admins',
        href: '/admins',
      }}
    >
      <div className="space-y-6">
        {/* Admin Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{admin.name}</CardTitle>
                <CardDescription>{admin.email}</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                {admin.role}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Permissions Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Module Permissions</CardTitle>
            <CardDescription>
              Select which modules and actions this admin can access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(MODULE_CONFIGS).map(([moduleKey, config]) => {
                const module = moduleKey as Module;
                return (
                  <div key={module} className="border-b pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{config.name}</h4>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {config.availablePermissions.map(permission => (
                        <label
                          key={permission}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={hasPermission(module, permission)}
                            onCheckedChange={() => togglePermission(module, permission)}
                          />
                          <span className="text-sm">{PERMISSION_LABELS[permission]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Permissions'}
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </CrudLayout>
  );
}

