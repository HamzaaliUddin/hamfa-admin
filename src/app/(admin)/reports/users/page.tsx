'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUsersReport } from '@/queries/reports';
import { TrendingDown, TrendingUp, UserCheck, Users, UserX } from 'lucide-react';

export default function UserGrowthReportPage() {
  const { data: usersData, isLoading } = useGetUsersReport();
  const report = usersData?.body?.data;

  const columns = [
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-muted-foreground text-sm">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'total_orders',
      header: 'Orders',
      cell: ({ row }: any) => (
        <Badge variant="secondary">{row.original.total_orders || 0} orders</Badge>
      ),
    },
    {
      accessorKey: 'total_spent',
      header: 'Total Spent',
      cell: ({ row }: any) => (
        <div className="font-semibold text-green-600">
          Rs {Number(row.original.total_spent || 0).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
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
    total: report?.totalUsers || 0,
    active: report?.activeUsers || 0,
    inactive: report?.inactiveUsers || 0,
    newThisMonth: report?.newUsersThisMonth || 0,
    userGrowth: Number(report?.userGrowth) || 0,
    totalSpending: Number(report?.totalSpending) || 0,
    avgSpending: Number(report?.averageSpending) || 0,
  };

  const growthData = report?.growthData || [];
  const topCustomers = report?.topCustomers || [];
  const statusDistribution = report?.statusDistribution || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Growth Report</h1>
        <p className="text-muted-foreground">Track user registration and growth trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-blue-500" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p
              className={`mt-1 flex items-center gap-1 text-xs ${stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {stats.userGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {stats.userGrowth >= 0 ? '+' : ''}
              {stats.userGrowth.toFixed(1)}% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <UserCheck className="h-4 w-4 text-green-500" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(1) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newThisMonth}</div>
            <p className="text-muted-foreground mt-1 text-xs">New registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <UserX className="h-4 w-4 text-red-500" />
              Inactive Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <p className="mt-1 text-xs text-red-600">
              {stats.total > 0 ? ((stats.inactive / stats.total) * 100).toFixed(1) : 0}% inactive
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth Trend</CardTitle>
          <CardDescription>New user registrations over time</CardDescription>
        </CardHeader>
        <CardContent>
          {growthData.length > 0 ? (
            <div className="space-y-4">
              {growthData.slice(0, 12).map((month: any) => (
                <div key={month.date} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="w-24 font-medium">{month.date}</span>
                    <span className="text-muted-foreground">+{month.newUsers} new users</span>
                    <span className="font-semibold">{month.totalUsers} total</span>
                  </div>
                  <div className="h-8 overflow-hidden rounded bg-gray-100">
                    <div
                      className="flex h-full items-center justify-end bg-blue-500 pr-2 text-xs font-medium text-white transition-all"
                      style={{
                        width: `${Math.min((month.totalUsers / (Math.max(...growthData.map((d: any) => d.totalUsers)) || 1)) * 100, 100)}%`,
                      }}
                    >
                      {month.totalUsers}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No growth data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spending Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Spending</CardTitle>
            <CardDescription>Revenue statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-muted-foreground text-sm">Total Customer Spending</div>
              <div className="text-3xl font-bold text-green-600">
                Rs {stats.totalSpending.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Average Spend Per User</div>
              <div className="text-3xl font-bold">Rs {stats.avgSpending.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Status Breakdown</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {statusDistribution.length > 0 ? (
              statusDistribution.map((item: any) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <div
                      className={`h-3 w-3 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                    <span className="capitalize">{item.status}</span>
                  </span>
                  <span className="font-semibold">
                    {item.count} ({Number(item.percentage).toFixed(0)}%)
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  Active
                </span>
                <span className="font-semibold">
                  {stats.active} (
                  {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(0) : 0}%)
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Highest spending customers</CardDescription>
        </CardHeader>
        <CardContent>
          {topCustomers.length > 0 ? (
            <DataTable columns={columns} data={topCustomers} searchKey="name" />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No customer data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
