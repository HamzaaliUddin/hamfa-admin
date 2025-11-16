'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart } from 'lucide-react';
import { orders } from '@/data/orders';

// Calculate sales statistics from orders
const calculateSalesStats = () => {
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalRevenue / totalOrders;
  
  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    completedOrders: completedOrders.length,
  };
};

const stats = calculateSalesStats();

// Monthly sales data (mock)
const monthlySales = [
  { month: 'Jan', revenue: 4231, orders: 89 },
  { month: 'Feb', revenue: 5123, orders: 102 },
  { month: 'Mar', revenue: 6234, orders: 125 },
  { month: 'Apr', revenue: 5821, orders: 118 },
  { month: 'May', revenue: 7234, orders: 145 },
  { month: 'Jun', revenue: 8123, orders: 162 },
];

// Top selling products (mock)
const topProducts = [
  { id: '1', name: 'Premium Leather Jacket', sales: 45, revenue: 13499.55 },
  { id: '2', name: 'Wireless Bluetooth Headphones', sales: 89, revenue: 13349.11 },
  { id: '3', name: 'Smart Fitness Watch', sales: 67, revenue: 13399.33 },
  { id: '4', name: 'Running Shoes', sales: 54, revenue: 4859.46 },
  { id: '5', name: 'Gaming Mouse', sales: 38, revenue: 2279.62 },
];

export default function SalesReportPage() {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }: any) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: 'sales',
      header: 'Units Sold',
      cell: ({ row }: any) => <Badge variant="secondary">{row.original.sales} units</Badge>,
    },
    {
      accessorKey: 'revenue',
      header: 'Revenue',
      cell: ({ row }: any) => (
        <div className="font-semibold text-green-600">
          ${row.original.revenue.toFixed(2)}
        </div>
      ),
    },
  ];

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
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +4.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monthly Sales Trend
          </CardTitle>
          <CardDescription>Revenue and orders over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlySales.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-12 font-medium">{month.month}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-8 bg-primary rounded"
                      style={{ width: `${(month.revenue / 10000) * 100}%` }}
                    />
                    <span className="text-sm font-medium">${month.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <Badge variant="secondary">{month.orders} orders</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={topProducts} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  );
}
