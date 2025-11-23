'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardStats } from '@/queries/reports/useGetDashboardStats.query';
import { useGetRecentOrders } from '@/queries/reports/useGetRecentOrders.query';
import { authUtils } from '@/utils/auth';
import { DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStats();
  const { data: recentOrdersData, isLoading: ordersLoading } = useGetRecentOrders({ limit: 5 });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = authUtils.getUser();
    setUser(userData);
  }, []);

  const stats = statsData?.data || {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
  };

  const recentOrders = recentOrdersData?.data || [];

  const statCards = [
    {
      title: 'Total Revenue',
      value: new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
      }).format(stats.totalRevenue),
      description: `${stats.revenueGrowth >= 0 ? '+' : ''}${stats.revenueGrowth}% from last month`,
      icon: DollarSign,
      trend: stats.revenueGrowth >= 0 ? 'up' : 'down',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      description: `${stats.ordersGrowth >= 0 ? '+' : ''}${stats.ordersGrowth}% from last month`,
      icon: ShoppingCart,
      trend: stats.ordersGrowth >= 0 ? 'up' : 'down',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      description: `${stats.lowStockProducts} low stock items`,
      icon: Package,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      description: `${stats.pendingOrders} pending orders`,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Admin'}! 👋</h1>
        <p className="text-muted-foreground">
          {user?.email} • {user?.role?.name || 'Admin'} • Hamfa Admin Panel
        </p>
      </div>

      {statsLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="mb-2 h-8 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-muted-foreground flex items-center gap-1 text-xs">
                  {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                  {stat.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              {ordersLoading ? 'Loading...' : `You have ${stats.pendingOrders} pending orders.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                    <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div
                    key={order.order_id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{order.order_number}</p>
                      <p className="text-muted-foreground text-xs">
                        User #{order.user_id} •{' '}
                        {new Date(order.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'default'
                            : order.status === 'cancelled'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {order.status}
                      </Badge>
                      <p className="text-sm font-medium">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(order.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent orders</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>System overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Pending Orders</p>
                <p className="text-sm font-bold">{stats.pendingOrders}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Low Stock Products</p>
                <p className="text-sm font-bold text-orange-600">{stats.lowStockProducts}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Total Products</p>
                <p className="text-sm font-bold">{stats.totalProducts}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Total Users</p>
                <p className="text-sm font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
