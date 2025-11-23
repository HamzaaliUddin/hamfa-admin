'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { orders } from '@/data/orders';
import { CheckCircle, Clock, Package, TrendingUp, XCircle } from 'lucide-react';

// Calculate order statistics
const calculateOrderStats = () => {
  const pending = orders.filter(o => o.status === 'pending').length;
  const processing = orders.filter(o => o.status === 'processing').length;
  const shipped = orders.filter(o => o.status === 'shipped').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const cancelled = orders.filter(o => o.status === 'cancelled').length;

  return {
    total: orders.length,
    pending,
    processing,
    shipped,
    delivered,
    cancelled,
  };
};

const stats = calculateOrderStats();

// Order status distribution data
const statusData = [
  {
    status: 'Pending',
    count: stats.pending,
    color: 'bg-yellow-500',
    percentage: (stats.pending / stats.total) * 100,
  },
  {
    status: 'Processing',
    count: stats.processing,
    color: 'bg-blue-500',
    percentage: (stats.processing / stats.total) * 100,
  },
  {
    status: 'Shipped',
    count: stats.shipped,
    color: 'bg-purple-500',
    percentage: (stats.shipped / stats.total) * 100,
  },
  {
    status: 'Delivered',
    count: stats.delivered,
    color: 'bg-green-500',
    percentage: (stats.delivered / stats.total) * 100,
  },
  {
    status: 'Cancelled',
    count: stats.cancelled,
    color: 'bg-red-500',
    percentage: (stats.cancelled / stats.total) * 100,
  },
];

// Recent orders for table
const recentOrders = orders.map(order => ({
  orderNumber: order.orderNumber,
  customer: order.customer.name,
  items: order.items.length,
  total: order.total,
  status: order.status,
  date: new Date(order.createdAt).toLocaleDateString(),
}));

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'processing':
      return <Package className="h-4 w-4 text-blue-500" />;
    case 'shipped':
      return <TrendingUp className="h-4 w-4 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export default function OrderReportPage() {
  const columns = [
    {
      accessorKey: 'orderNumber',
      header: 'Order #',
      cell: ({ row }: any) => <div className="font-medium">{row.original.orderNumber}</div>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }: any) => <Badge variant="secondary">{row.original.items} items</Badge>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }: any) => <div className="font-semibold">Rs {row.original.total.toFixed(2)}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(row.original.status)}
          <span className="capitalize">{row.original.status}</span>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Report</h1>
        <p className="text-muted-foreground">View order statistics and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-muted-foreground mt-1 text-xs">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-yellow-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="mt-1 text-xs text-yellow-600">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Package className="h-4 w-4 text-blue-500" />
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
            <p className="mt-1 text-xs text-blue-600">Being prepared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
            <p className="mt-1 text-xs text-green-600">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <XCircle className="h-4 w-4 text-red-500" />
              Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
            <p className="mt-1 text-xs text-red-600">
              {((stats.cancelled / stats.total) * 100).toFixed(1)}% cancellation rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Distribution</CardTitle>
          <CardDescription>Breakdown of orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusData.map(item => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.status}</span>
                  <span className="text-muted-foreground">
                    {item.count} orders ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full ${item.color} transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest order activity</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={recentOrders} searchKey="orderNumber" />
        </CardContent>
      </Card>
    </div>
  );
}
