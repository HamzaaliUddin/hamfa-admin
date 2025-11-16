'use client';

import { useState } from 'react';
import { MoreHorizontal, Plus, Edit, Trash2, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CrudLayout } from '@/components/common/crud-layout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/common/data-table';
import { DeleteDialog } from '@/components/common/delete-dialog';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission, AdminRole } from '@/types/permissions';
import { usePermission, useIsSuperAdmin } from '@/hooks/use-permissions';
import { ROLE_LABELS } from '@/constants/permissions';

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

// Mock data - replace with API call
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
      return 'default';
    case AdminRole.ADMIN:
      return 'secondary';
    case AdminRole.MODERATOR:
      return 'outline';
  }
};

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const isSuperAdmin = useIsSuperAdmin();
  const canCreate = usePermission(Module.ADMIN_MANAGEMENT, Permission.CREATE);
  const canUpdate = usePermission(Module.ADMIN_MANAGEMENT, Permission.UPDATE);
  const canDelete = usePermission(Module.ADMIN_MANAGEMENT, Permission.DELETE);

  const handleDelete = (id: string) => {
    setAdmins(admins.filter(a => a.id !== id));
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Admin',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }: any) => {
        const role = row.original.role as AdminRole;
        return (
          <Badge variant={getRoleBadgeVariant(role)} className="gap-1">
            {getRoleIcon(role)}
            {ROLE_LABELS[role]}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }: any) =>
        row.original.lastLogin
          ? new Date(row.original.lastLogin).toLocaleDateString()
          : 'Never',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }: any) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const admin = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/admins/${admin.id}/permissions`}>
                  <Shield className="mr-2 h-4 w-4" />
                  Manage Permissions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {canUpdate && (
                <DropdownMenuItem asChild>
                  <Link href={`/admins/edit/${admin.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
              )}
              {canDelete && admin.role !== AdminRole.SUPER_ADMIN && (
                <DropdownMenuItem onClick={() => setDeleteId(admin.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Only SuperAdmin can access this page
  if (!isSuperAdmin) {
    return (
      <PermissionGuard module={Module.ADMIN_MANAGEMENT} permission={Permission.VIEW}>
        <div />
      </PermissionGuard>
    );
  }

  return (
    <CrudLayout
      title="Admin Management"
      description="Manage admin users and their permissions"
      actionButton={
        canCreate ? (
          <Button asChild>
            <Link href="/admins/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Admin
            </Link>
          </Button>
        ) : undefined
      }
    >
      <DataTable columns={columns} data={admins} searchKey="name" />

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Admin"
        description="Are you sure you want to delete this admin? This action cannot be undone and will revoke all their access."
      />
    </CrudLayout>
  );
}

