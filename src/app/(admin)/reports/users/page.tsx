'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { Users, UserCheck, UserX, TrendingUp, Mail } from 'lucide-react';
import { users } from '@/data/users';

// Calculate user statistics
const calculateUserStats = () => {
  const active = users.filter(u => u.status === 'active').length;
  const blocked = users.filter(u => u.status === 'blocked').length;
  const inactive = users.filter(u => u.status === 'inactive').length;
  const emailVerified = users.filter(u => u.emailVerified).length;
  const totalSpending = users.reduce((sum, user) => sum + user.totalSpent, 0);
  
  return {
    total: users.length,
    active,
    blocked,
    inactive,
    emailVerified,
    totalSpending,
    avgSpending: totalSpending / users.length,
  };
};

const stats = calculateUserStats();

// Monthly user growth (mock data)
const monthlyGrowth = [
  { month: 'Jan', newUsers: 45, totalUsers: 145 },
  { month: 'Feb', newUsers: 67, totalUsers: 212 },
  { month: 'Mar', newUsers: 89, totalUsers: 301 },
  { month: 'Apr', newUsers: 56, totalUsers: 357 },
  { month: 'May', newUsers: 78, totalUsers: 435 },
  { month: 'Jun', newUsers: 92, totalUsers: 527 },
];

// Top customers by spending
const topCustomers = users
  .filter(u => u.totalSpent > 0)
  .sort((a, b) => b.totalSpent - a.totalSpent)
  .slice(0, 5)
  .map(user => ({
    name: user.name,
    email: user.email,
    orders: user.totalOrders,
    spent: user.totalSpent,
    status: user.status,
  }));

export default function UserGrowthReportPage() {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'orders',
      header: 'Orders',
      cell: ({ row }: any) => (
        <Badge variant="secondary">{row.original.orders} orders</Badge>
      ),
    },
    {
      accessorKey: 'spent',
      header: 'Total Spent',
      cell: ({ row }: any) => (
        <div className="font-semibold text-green-600">
          ${row.original.spent.toFixed(2)}
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
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18.2% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.active / stats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-500" />
              Email Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailVerified}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.emailVerified / stats.total) * 100).toFixed(1)}% verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserX className="h-4 w-4 text-red-500" />
              Blocked Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blocked}</div>
            <p className="text-xs text-red-600 mt-1">
              {((stats.blocked / stats.total) * 100).toFixed(1)}% blocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth Trend</CardTitle>
          <CardDescription>New user registrations over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyGrowth.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium w-12">{month.month}</span>
                  <span className="text-muted-foreground">
                    +{month.newUsers} new users
                  </span>
                  <span className="font-semibold">{month.totalUsers} total</span>
                </div>
                <div className="h-8 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all flex items-center justify-end pr-2 text-white text-xs font-medium"
                    style={{ width: `${(month.totalUsers / 600) * 100}%` }}
                  >
                    {month.totalUsers}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <div className="text-sm text-muted-foreground">Total Customer Spending</div>
              <div className="text-3xl font-bold text-green-600">
                ${stats.totalSpending.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average Spend Per User</div>
              <div className="text-3xl font-bold">
                ${stats.avgSpending.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Status Breakdown</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                Active
              </span>
              <span className="font-semibold">{stats.active} ({((stats.active/stats.total)*100).toFixed(0)}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-400" />
                Inactive
              </span>
              <span className="font-semibold">{stats.inactive} ({((stats.inactive/stats.total)*100).toFixed(0)}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                Blocked
              </span>
              <span className="font-semibold">{stats.blocked} ({((stats.blocked/stats.total)*100).toFixed(0)}%)</span>
            </div>
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
          <DataTable columns={columns} data={topCustomers} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  );
}
