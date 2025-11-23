'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { TableActions } from '@/components/common/table-actions';
import { useRouter } from 'next/navigation';
import { useGetNotifications, Notification } from '@/queries/notifications/useGetNotifications.query';

export default function NotificationsPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetNotifications({ page, limit: 10 });

  const notifications = data?.data || [];

  const columns: ColumnDef<Notification>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as string;
        return (
          <Badge variant="outline">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'recipients',
      header: 'Recipients',
      cell: ({ row }) => <div>{row.getValue('recipients')}</div>,
    },
    {
      accessorKey: 'click_count',
      header: 'Clicks',
      cell: ({ row }) => <div className="text-center">{row.getValue('click_count')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const variant = status === 'sent' ? 'default' : status === 'failed' ? 'destructive' : 'secondary';
        return (
          <Badge variant={variant}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'sent_at',
      header: 'Sent At',
      cell: ({ row }) => {
        const sentAt = row.getValue('sent_at') as string;
        return sentAt ? new Date(sentAt).toLocaleDateString('en-IN') : '—';
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const notification = row.original;
        return (
          <TableActions
            onView={() => router.push(`/notifications/${notification.notification_id}`)}
            viewLabel="View Details"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notifications" description="Manage customer notifications" addNewLabel="Send Notification" addNewHref="/notifications/send" />
        <div className="text-center py-10 text-red-500">Error loading notifications. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="Manage customer notifications" addNewLabel="Send Notification" addNewHref="/notifications/send" />
      <DataTable columns={columns} data={notifications} searchKey="title" searchPlaceholder="Search notifications..." isLoading={isLoading} />
    </div>
  );
}
