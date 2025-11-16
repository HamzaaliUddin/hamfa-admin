import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Award, Image } from 'lucide-react';

const stats = [
  {
    title: 'Total Products',
    value: '245',
    description: '+12% from last month',
    icon: Package,
  },
  {
    title: 'Total Orders',
    value: '1,234',
    description: '+8% from last month',
    icon: ShoppingCart,
  },
  {
    title: 'Total Brands',
    value: '45',
    description: '+3 new brands',
    icon: Award,
  },
  {
    title: 'Active Banners',
    value: '8',
    description: '2 expiring soon',
    icon: Image,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Hamfa Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have 23 orders this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <p className="text-sm text-muted-foreground">Order list will be displayed here...</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <p className="text-sm text-muted-foreground">Activity log will be displayed here...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

