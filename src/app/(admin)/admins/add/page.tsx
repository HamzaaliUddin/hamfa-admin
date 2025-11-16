'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission, AdminRole } from '@/types/permissions';
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/constants/permissions';
import { useIsSuperAdmin } from '@/hooks/use-permissions';
import { ShieldCheck, Shield, ShieldAlert } from 'lucide-react';

export default function AddAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<AdminRole>(AdminRole.ADMIN);
  const isSuperAdmin = useIsSuperAdmin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to create admin
    setTimeout(() => {
      setLoading(false);
      router.push('/admins');
    }, 1000);
  };

  if (!isSuperAdmin) {
    return (
      <PermissionGuard module={Module.ADMIN_MANAGEMENT} permission={Permission.CREATE}>
        <div />
      </PermissionGuard>
    );
  }

  return (
    <CrudLayout
      title="Add Admin User"
      description="Create a new admin account with specific permissions"
      backButton={{
        label: 'Back to Admins',
        href: '/admins',
      }}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Admin Details</CardTitle>
              <CardDescription>Enter the basic information for the new admin</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="e.g., John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="admin@hamfa.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    required
                    minLength={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Admin Role *</Label>
                  <Select value={role} onValueChange={value => setRole(value as AdminRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AdminRole.SUPER_ADMIN}>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4" />
                          {ROLE_LABELS[AdminRole.SUPER_ADMIN]}
                        </div>
                      </SelectItem>
                      <SelectItem value={AdminRole.ADMIN}>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          {ROLE_LABELS[AdminRole.ADMIN]}
                        </div>
                      </SelectItem>
                      <SelectItem value={AdminRole.MODERATOR}>
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4" />
                          {ROLE_LABELS[AdminRole.MODERATOR]}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="isActive" defaultChecked className="h-4 w-4" />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Set account as active
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Admin'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Role Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Role Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h4 className="font-medium">Super Admin</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full system access including admin management
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium">Admin</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Can manage products, orders, and most content
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  <h4 className="font-medium">Moderator</h4>
                </div>
                <p className="text-sm text-muted-foreground">Limited permissions, mostly view-only</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CrudLayout>
  );
}

