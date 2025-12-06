'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSalesReport } from '@/queries/reports';
import { BarChart3, DollarSign, ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react';

export default function SalesReportPage() {
  const { data: salesData, isLoading } = useGetSalesReport();
  const report = salesData?.body?.data;

  const columns = [
    {
      accessorKey: 'title',
      header: 'Product',
      cell: ({ row }: any) => <div className="font-medium">{row.original.title}</div>,
    },
    {
      accessorKey: 'sales',
      header: 'Units Sold',
      cell: ({ row }: any) => <Badge variant="secondary">{row.original.sales || 0} units</Badge>,
    },
    {
      accessorKey: 'revenue',
      header: 'Revenue',
      cell: ({ row }: any) => (
        <div className="font-semibold text-green-600">
          Rs {Number(row.original.revenue || 0).toFixed(2)}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const stats = {
    totalRevenue: report?.revenue || 0,
    totalOrders: report?.totalOrders || 0,
    avgOrderValue: report?.averageOrderValue || 0,
    revenueGrowth: report?.revenueGrowth || 0,
    ordersGrowth: report?.ordersGrowth || 0,
  };

  const periodData = report?.periodData || [];
  const topProducts = report?.topProducts || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sales Report</h1>
        <p className="text-muted-foreground">View sales analytics and trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {stats.totalRevenue.toFixed(2)}</div>
            <p
              className={`mt-1 flex items-center gap-1 text-xs ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {stats.revenueGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {stats.revenueGrowth >= 0 ? '+' : ''}
              {stats.revenueGrowth.toFixed(1)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p
              className={`mt-1 flex items-center gap-1 text-xs ${stats.ordersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {stats.ordersGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {stats.ordersGrowth >= 0 ? '+' : ''}
              {stats.ordersGrowth.toFixed(1)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {stats.avgOrderValue.toFixed(2)}</div>
            <p className="text-muted-foreground mt-1 text-xs">Per order average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report?.totalSales || 0}</div>
            <p className="text-muted-foreground mt-1 text-xs">Units sold</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sales Trend
          </CardTitle>
          <CardDescription>Revenue and orders over time</CardDescription>
        </CardHeader>
        <CardContent>
          {periodData.length > 0 ? (
            <div className="space-y-4">
              {periodData.slice(0, 10).map((item: any) => (
                <div key={item.date} className="flex items-center gap-4">
                  <div className="w-24 font-medium">{item.date}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-primary h-8 rounded"
                        style={{
                          width: `${Math.min((Number(item.revenue) / (Math.max(...periodData.map((d: any) => Number(d.revenue))) || 1)) * 100, 100)}%`,
                        }}
                      />
                      <span className="text-sm font-medium">
                        Rs {Number(item.revenue).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{item.orders} orders</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No sales data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          {topProducts.length > 0 ? (
            <DataTable columns={columns} data={topProducts} searchKey="title" />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No product data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
