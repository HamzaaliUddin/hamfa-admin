'use client';

import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, User as UserIcon, Edit, Shield, ShieldCheck, ShieldAlert, Calendar, Mail } from 'lucide-react';
import { AdminRole } from '@/types/permissions';
import { ROLE_LABELS } from '@/constants/permissions';

// Mock admin data - replace with API call when available
type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
};

const mockAdmins: AdminUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@hamfa.com',
    role: AdminRole.SUPER_ADMIN,
    isActive: true,
    lastLogin: '2024-02-10',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@hamfa.com',
    role: AdminRole.ADMIN,
    isActive: true,
    lastLogin: '2024-02-09',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@hamfa.com',
    role: AdminRole.MODERATOR,
    isActive: true,
    lastLogin: '2024-02-08',
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice@hamfa.com',
    role: AdminRole.ADMIN,
    isActive: false,
    createdAt: '2024-01-10',
  },
];

const getRoleIcon = (role: AdminRole) => {
  switch (role) {
    case AdminRole.SUPER_ADMIN:
      return <ShieldCheck className="h-4 w-4" />;
    case AdminRole.ADMIN:
      return <Shield className="h-4 w-4" />;
    case AdminRole.MODERATOR:
      return <ShieldAlert className="h-4 w-4" />;
  }
};

const getRoleBadgeVariant = (role: AdminRole) => {
  switch (role) {
    case AdminRole.SUPER_ADMIN:
      return 'default' as const;
    case AdminRole.ADMIN:
      return 'secondary' as const;
    case AdminRole.MODERATOR:
      return 'outline' as const;
  }
};

export default function AdminViewPage() {
  const params = useParams();
  const router = useRouter();
  const adminId = params.id as string;

  // In production, replace this with actual API call
  const admin = mockAdmins.find((a) => a.id === adminId);

  if (!admin) {
    return (
      <div className="space-y-6">
        <PageHeader title="Admin Details" description="View admin information" />
        <div className="py-10 text-center">
          <UserIcon className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Admin not found</h2>
          <p className="text-muted-foreground mb-6">The admin you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/admins')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admins
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/admins')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={admin.name} description={`Admin ID: ${admin.id}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={admin.avatar} />
                <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={getRoleBadgeVariant(admin.role)} className="gap-1">
                    {getRoleIcon(admin.role)}
                    {ROLE_LABELS[admin.role]}
                  </Badge>
                  <Badge variant={admin.isActive ? 'default' : 'secondary'}>
                    {admin.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/admins/${admin.id}/permissions`)}>
                <Shield className="mr-2 h-4 w-4" />
                Manage Permissions
              </Button>
              <Button variant="outline" onClick={() => router.push(`/admins/edit/${admin.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Admin Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Admin Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="font-medium">{admin.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <a href={`mailto:${admin.email}`} className="text-primary font-medium hover:underline">
                {admin.email}
              </a>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Admin ID</p>
              <p className="font-medium">#{admin.id}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Account Status</p>
              <Badge variant={admin.isActive ? 'default' : 'secondary'}>
                {admin.isActive ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Role & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Role</p>
              <div className="mt-2">
                <Badge variant={getRoleBadgeVariant(admin.role)} className="gap-1">
                  {getRoleIcon(admin.role)}
                  {ROLE_LABELS[admin.role]}
                </Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Role Description</p>
              {admin.role === AdminRole.SUPER_ADMIN && (
                <p className="text-sm">Full access to all modules and features including admin management.</p>
              )}
              {admin.role === AdminRole.ADMIN && (
                <p className="text-sm">Access to most modules with custom permissions. Cannot manage admins.</p>
              )}
              {admin.role === AdminRole.MODERATOR && (
                <p className="text-sm">Limited access based on assigned permissions. Typically for content moderation.</p>
              )}
            </div>
            <Separator />
            <div>
              <Button variant="outline" onClick={() => router.push(`/admins/${admin.id}/permissions`)}>
                <Shield className="mr-2 h-4 w-4" />
                View & Edit Permissions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {admin.lastLogin && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Login</span>
                <span className="font-medium">{new Date(admin.lastLogin).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <Separator />
            </>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Created</span>
            <span className="font-medium">{new Date(admin.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

