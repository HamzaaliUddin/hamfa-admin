'use client';

import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetAdminById } from '@/queries/admins';
import {
  ArrowLeft,
  Edit,
  Loader2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
  Key,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import ROUTES from '@/utils/route';

// Get role icon
const getRoleIcon = (roleName: string) => {
  switch (roleName) {
    case 'Super Admin':
      return <ShieldCheck className="h-5 w-5" />;
    case 'Admin':
      return <Shield className="h-5 w-5" />;
    case 'Moderator':
      return <ShieldAlert className="h-5 w-5" />;
    default:
      return <Shield className="h-5 w-5" />;
  }
};

const getRoleBadgeVariant = (roleName: string) => {
  switch (roleName) {
    case 'Super Admin':
      return 'default';
    case 'Admin':
      return 'secondary';
    case 'Moderator':
      return 'outline';
    default:
      return 'secondary';
  }
};

// Permission labels
const PERMISSION_LABELS: Record<string, string> = {
  view: 'View',
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
};

export default function AdminViewPage() {
  const params = useParams();
  const router = useRouter();
  const adminId = params.id as string;

  const { data: adminData, isLoading, error } = useGetAdminById(Number(adminId));
  const admin = adminData?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="space-y-6">
        <PageHeader title="Admin Details" description="View admin information" />
        <div className="py-10 text-center">
          <User className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Admin not found</h2>
          <p className="text-muted-foreground mb-6">
            The admin you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/admins')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admins
          </Button>
        </div>
      </div>
    );
  }

  // Group permissions by module
  const groupedPermissions: Record<string, string[]> = {};
  if (admin.role?.permissions) {
    admin.role.permissions.forEach((perm: any) => {
      if (!groupedPermissions[perm.module]) {
        groupedPermissions[perm.module] = [];
      }
      groupedPermissions[perm.module].push(perm.action);
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/admins')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={admin.name} description={admin.email} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                  {admin.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{admin.name}</h2>
                  <Badge variant={admin.is_active ? 'default' : 'secondary'}>
                    {admin.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{admin.email}</p>
                <Badge
                  variant={getRoleBadgeVariant(admin.role?.name || '')}
                  className="mt-1 gap-1"
                >
                  {getRoleIcon(admin.role?.name || '')}
                  {admin.role?.name}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(ROUTES.ADMINS.PERMISSIONS(admin.user_id))}
              >
                <Key className="mr-2 h-4 w-4" />
                Manage Permissions
              </Button>
              <Button onClick={() => router.push(ROUTES.ADMINS.EDIT(admin.user_id))}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Admin
              </Button>
              {admin.role?.name !== 'Super Admin' && (
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Admin Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Admin Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Full Name</p>
              <p className="font-medium">{admin.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Email Address</p>
              <p className="font-medium">{admin.email}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Role</p>
              <Badge
                variant={getRoleBadgeVariant(admin.role?.name || '')}
                className="mt-1 gap-1"
              >
                {getRoleIcon(admin.role?.name || '')}
                {admin.role?.name}
              </Badge>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <Badge variant={admin.is_active ? 'default' : 'secondary'} className="mt-1">
                {admin.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Created At</p>
              <p className="font-medium">
                {admin.created_at ? new Date(admin.created_at).toLocaleString() : '-'}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Updated At</p>
              <p className="font-medium">
                {admin.updated_at ? new Date(admin.updated_at).toLocaleString() : '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Assigned Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(groupedPermissions).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([module, actions]) => (
                  <div key={module} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-medium capitalize">{module.replace('_', ' ')}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {actions.map(action => (
                        <Badge key={action} variant="secondary">
                          {PERMISSION_LABELS[action] || action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Key className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <p className="text-muted-foreground">No specific permissions assigned.</p>
                <p className="text-muted-foreground text-sm">
                  This admin inherits permissions from their role.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
