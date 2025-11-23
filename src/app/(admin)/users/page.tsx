'use client';

import { DataTable } from '@/components/common/data-table';
import { PageHeader } from '@/components/common/page-header';
import { TableActions } from '@/components/common/table-actions';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetUsers, User } from '@/queries/users/useGetUsers.query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function UsersPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetUsers({ page, limit: 10 });

  const users = data?.data || [];

  // Debug logging
  React.useEffect(() => {
    console.log('🔍 Debug Info:', {
      data,
      users,
      usersLength: users.length,
      isLoading,
      error,
    });
  }, [data, users, isLoading, error]);

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as User['role'];
        return role ? (
          <div>{role.name}</div>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        );
      },
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => {
        const brand = row.getValue('brand') as User['brand'];
        return brand ? (
          <div>{brand.name}</div>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        );
      },
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = row.getValue('is_active') as boolean;
        return (
          <Badge variant={isActive ? 'default' : 'destructive'}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string;
        return date ? new Date(date).toLocaleDateString('en-IN') : '—';
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <TableActions
            onView={() => router.push(`/users/${user.user_id}`)}
            viewLabel="View Details"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Users" description="View and manage user accounts" />
        <div className="py-10 text-center text-red-500">Error loading users. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="View and manage user accounts" />

      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        searchPlaceholder="Search users..."
        isLoading={isLoading}
      />
    </div>
  );
}
