'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import {
  AlertCircle,
  DollarSign,
  Eye,
  MoreHorizontal,
  RotateCcw,
  TrendingDown,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

type CancelledOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  orderDate: string;
  cancelledDate: string;
  cancelReason: string;
  refundStatus: 'pending' | 'processed' | 'completed';
};

const cancelledOrders: CancelledOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-101',
    customer: 'Akash Mehta',
    email: 'akash.m@example.com',
    items: 2,
    total: 6999,
    orderDate: '2024-01-18',
    cancelledDate: '2024-01-19',
    cancelReason: 'Customer requested cancellation',
    refundStatus: 'completed',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-102',
    customer: 'Riya Kapoor',
    email: 'riya.k@example.com',
    items: 1,
    total: 2999,
    orderDate: '2024-01-17',
    cancelledDate: '2024-01-18',
    cancelReason: 'Product out of stock',
    refundStatus: 'completed',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-103',
    customer: 'Karan Shah',
    email: 'karan.s@example.com',
    items: 3,
    total: 15999,
    orderDate: '2024-01-16',
    cancelledDate: '2024-01-17',
    cancelReason: 'Wrong address provided',
    refundStatus: 'processed',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-104',
    customer: 'Pooja Agarwal',
    email: 'pooja.a@example.com',
    items: 1,
    total: 4999,
    orderDate: '2024-01-15',
    cancelledDate: '2024-01-16',
    cancelReason: 'Changed mind',
    refundStatus: 'completed',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-105',
    customer: 'Rohan Sinha',
    email: 'rohan.s@example.com',
    items: 2,
    total: 9999,
    orderDate: '2024-01-14',
    cancelledDate: '2024-01-15',
    cancelReason: 'Found better price elsewhere',
    refundStatus: 'pending',
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-106',
    customer: 'Sneha Bhatt',
    email: 'sneha.b@example.com',
    items: 4,
    total: 22999,
    orderDate: '2024-01-13',
    cancelledDate: '2024-01-14',
    cancelReason: 'Delivery taking too long',
    refundStatus: 'processed',
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-107',
    customer: 'Arjun Rao',
    email: 'arjun.r@example.com',
    items: 1,
    total: 7999,
    orderDate: '2024-01-12',
    cancelledDate: '2024-01-13',
    cancelReason: 'Duplicate order',
    refundStatus: 'completed',
  },
  {
    id: '8',
    orderNumber: 'ORD-2024-108',
    customer: 'Divya Nair',
    email: 'divya.n@example.com',
    items: 2,
    total: 11999,
    orderDate: '2024-01-11',
    cancelledDate: '2024-01-12',
    cancelReason: 'Payment failed',
    refundStatus: 'completed',
  },
];

export default function OrdersCancelledPage() {
  const [orders, setOrders] = useState(cancelledOrders);

  // Calculate stats
  const totalLostRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const refundPending = orders.filter(o => o.refundStatus === 'pending').length;
  const refundProcessed = orders.filter(o => o.refundStatus === 'processed').length;
  const refundCompleted = orders.filter(o => o.refundStatus === 'completed').length;

  const columns: ColumnDef<CancelledOrder>[] = [
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
      accessorKey: 'orderNumber',
      header: 'Order #',
      cell: ({ row }) => <div className="font-medium">{row.getValue('orderNumber')}</div>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue('customer')}</div>
          <div className="text-muted-foreground text-sm">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => <div className="text-center">{row.getValue('items')}</div>,
    },
    {
      accessorKey: 'total',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.getValue('total') as number;
        const formatted = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(amount);
        return <div className="font-medium text-red-600">{formatted}</div>;
      },
    },
    {
      accessorKey: 'cancelledDate',
      header: 'Cancelled Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('cancelledDate'));
        return <div className="text-sm">{date.toLocaleDateString('en-IN')}</div>;
      },
    },
    {
      accessorKey: 'cancelReason',
      header: 'Reason',
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <p className="truncate text-sm">{row.getValue('cancelReason')}</p>
        </div>
      ),
    },
    {
      accessorKey: 'refundStatus',
      header: 'Refund Status',
      cell: ({ row }) => {
        const status = row.getValue('refundStatus') as string;
        const variants = {
          pending: 'secondary',
          processed: 'default',
          completed: 'default',
        } as const;
        const colors = {
          pending: 'bg-amber-100 text-amber-800',
          processed: 'bg-blue-100 text-blue-800',
          completed: 'bg-green-100 text-green-800',
        };
        return (
          <Badge className={colors[status as keyof typeof colors]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;
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
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RotateCcw className="mr-2 h-4 w-4" />
                Recreate Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cancelled Orders</h1>
        <p className="text-muted-foreground">View cancelled orders and refund status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-muted-foreground text-xs">Orders cancelled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost Revenue</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              Rs {(totalLostRevenue / 1000).toFixed(1)}k
            </div>
            <p className="text-muted-foreground text-xs">From cancellations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{refundPending}</div>
            <p className="text-muted-foreground text-xs">Awaiting refund</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Complete</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{refundCompleted}</div>
            <p className="text-muted-foreground text-xs">{refundProcessed} processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Cancellation Reasons Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Cancellation Reasons</CardTitle>
            <CardDescription>Most common reasons for order cancellation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { reason: 'Customer requested', count: 3 },
                { reason: 'Payment issues', count: 2 },
                { reason: 'Out of stock', count: 1 },
                { reason: 'Delivery delay', count: 1 },
                { reason: 'Other reasons', count: 1 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-2">
                  <span className="text-sm">{item.reason}</span>
                  <Badge variant="secondary">{item.count} orders</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Refund Status Overview</CardTitle>
            <CardDescription>Current status of refunds for cancelled orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border bg-green-50 p-3">
                <div>
                  <p className="font-medium">Completed</p>
                  <p className="text-muted-foreground text-xs">Refund sent to customer</p>
                </div>
                <Badge className="bg-green-600">{refundCompleted}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-blue-50 p-3">
                <div>
                  <p className="font-medium">Processing</p>
                  <p className="text-muted-foreground text-xs">Refund being processed</p>
                </div>
                <Badge className="bg-blue-600">{refundProcessed}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-amber-50 p-3">
                <div>
                  <p className="font-medium">Pending</p>
                  <p className="text-muted-foreground text-xs">Awaiting approval</p>
                </div>
                <Badge className="bg-amber-600">{refundPending}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cancelled Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cancelled Orders List</CardTitle>
          <CardDescription>
            All cancelled orders with refund status and cancellation reasons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={orders}
            searchKey="orderNumber"
            searchPlaceholder="Search cancelled orders..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
