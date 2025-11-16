'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { TableActions } from '@/components/common/table-actions';
import { useRouter } from 'next/navigation';

// Order Type
export type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
};

// Sample Data
const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    items: 3,
    total: 15999,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Jane Smith',
    email: 'jane.smith@example.com',
    items: 2,
    total: 8999,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2024-01-16',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Johnson',
    email: 'mike.j@example.com',
    items: 1,
    total: 2999,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2024-01-17',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Sarah Williams',
    email: 'sarah.w@example.com',
    items: 5,
    total: 25999,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-18',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Tom Brown',
    email: 'tom.b@example.com',
    items: 2,
    total: 6999,
    status: 'cancelled',
    paymentStatus: 'failed',
    createdAt: '2024-01-19',
  },
];

const statusColors = {
  pending: 'secondary',
  processing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
} as const;

const paymentColors = {
  pending: 'secondary',
  paid: 'default',
  failed: 'destructive',
} as const;

export default function OrdersPage() {
  const router = useRouter();
  const [orders] = React.useState<Order[]>(sampleOrders);

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
      accessorKey: 'orderNumber',
      header: 'Order #',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('orderNumber')}</div>
      ),
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue('customer')}</div>
          <div className="text-sm text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('items')}</div>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('total'));
        const formatted = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Order Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as keyof typeof statusColors;
        return (
          <Badge variant={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => {
        const status = row.getValue('paymentStatus') as keyof typeof paymentColors;
        return (
          <Badge variant={paymentColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return date.toLocaleDateString('en-IN');
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original;

        return (
          <TableActions
            onView={() => router.push(`/orders/${order.id}`)}
            onEdit={() => router.push(`/orders/${order.id}/edit`)}
            viewLabel="View Details"
            editLabel="Update Status"
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="View and manage customer orders"
      />

      <DataTable 
        columns={columns} 
        data={orders} 
        searchKey="orderNumber" 
        searchPlaceholder="Search orders..." 
      />
    </div>
  );
}
