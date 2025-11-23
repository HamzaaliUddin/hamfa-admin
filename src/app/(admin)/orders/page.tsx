'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { TableActions } from '@/components/common/table-actions';
import { useRouter } from 'next/navigation';
import { useGetOrders, Order } from '@/queries/orders/useGetOrders.query';

export default function OrdersPage() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useGetOrders({ page, limit: 10 });

  const orders = data?.data || [];

  const columns: ColumnDef<Order>[] = [
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
      accessorKey: 'order_number',
      header: 'Order',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('order_number')}</div>
      ),
    },
    {
      accessorKey: 'user_id',
      header: 'Customer',
      cell: ({ row }) => <div>User #{row.getValue('user_id')}</div>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('total'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(total);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const variant =
          status === 'delivered'
            ? 'default'
            : status === 'cancelled'
              ? 'destructive'
              : 'secondary';
        return (
          <Badge variant={variant}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'payment_status',
      header: 'Payment',
      cell: ({ row }) => {
        const paymentStatus = row.getValue('payment_status') as string;
        const variant =
          paymentStatus === 'paid'
            ? 'default'
            : paymentStatus === 'failed'
              ? 'destructive'
              : 'secondary';
        return (
          <Badge variant={variant}>
            {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string;
        return date ? new Date(date).toLocaleDateString('en-IN') : '—';
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original;

        return (
          <TableActions
            onView={() => router.push(`/orders/${order.order_id}`)}
            viewLabel="View Details"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Orders"
          description="View and manage customer orders"
        />
        <div className="text-center py-10 text-red-500">
          Error loading orders. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="View and manage customer orders"
      />

      <DataTable
        columns={columns}
        data={orders}
        searchKey="order_number"
        searchPlaceholder="Search orders..."
        isLoading={isLoading}
      />
    </div>
  );
}
