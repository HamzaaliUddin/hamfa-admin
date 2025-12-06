'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetOrdersReport } from '@/queries/reports';
import { CheckCircle, Clock, Package, TrendingUp, XCircle } from 'lucide-react';

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'shipped':
      return 'bg-purple-500';
    case 'delivered':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function OrderReportPage() {
  const { data: ordersData, isLoading } = useGetOrdersReport();
  const report = ordersData?.body?.data;

  const columns = [
    {
      accessorKey: 'order_number',
      header: 'Order #',
      cell: ({ row }: any) => <div className="font-medium">{row.original.order_number}</div>,
    },
    {
      accessorKey: 'customer_name',
      header: 'Customer',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.customer_name || 'N/A'}</div>
          <div className="text-muted-foreground text-sm">{row.original.customer_email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'items_count',
      header: 'Items',
      cell: ({ row }: any) => (
        <Badge variant="secondary">{row.original.items_count || 0} items</Badge>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }: any) => (
        <div className="font-semibold">Rs {Number(row.original.total || 0).toFixed(2)}</div>
      ),
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
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }: any) =>
        row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : '-',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const stats = {
    total: report?.totalOrders || 0,
    pending: report?.pendingOrders || 0,
    processing: report?.processingOrders || 0,
    shipped: report?.shippedOrders || 0,
    delivered: report?.deliveredOrders || 0,
    cancelled: report?.cancelledOrders || 0,
  };

  const statusDistribution = report?.statusDistribution || [];
  const recentOrders = report?.recentOrders || [];

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
              {stats.total > 0 ? ((stats.cancelled / stats.total) * 100).toFixed(1) : 0}%
              cancellation rate
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
          {statusDistribution.length > 0 ? (
            <div className="space-y-4">
              {statusDistribution.map((item: any) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium capitalize">
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                    <span className="text-muted-foreground">
                      {item.count} orders ({Number(item.percentage).toFixed(1)}%) - Rs{' '}
                      {Number(item.revenue).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full ${getStatusColor(item.status)} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No order data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest order activity</CardDescription>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <DataTable columns={columns} data={recentOrders} searchKey="order_number" />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No orders available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
