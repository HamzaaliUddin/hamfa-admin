'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/common/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MoreHorizontal, 
  Eye, 
  Download, 
  Package, 
  TrendingUp,
  DollarSign,
  ShoppingCart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type CompletedOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  deliveredDate: string;
  orderDate: string;
  rating?: number;
};

const completedOrders: CompletedOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'Rajesh Kumar',
    email: 'rajesh.k@example.com',
    items: 3,
    total: 15999,
    deliveredDate: '2024-01-20',
    orderDate: '2024-01-15',
    rating: 5,
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Priya Sharma',
    email: 'priya.s@example.com',
    items: 2,
    total: 8999,
    deliveredDate: '2024-01-19',
    orderDate: '2024-01-14',
    rating: 4,
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Amit Patel',
    email: 'amit.p@example.com',
    items: 5,
    total: 32999,
    deliveredDate: '2024-01-18',
    orderDate: '2024-01-13',
    rating: 5,
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Neha Singh',
    email: 'neha.singh@example.com',
    items: 1,
    total: 4999,
    deliveredDate: '2024-01-17',
    orderDate: '2024-01-12',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Vikas Gupta',
    email: 'vikas.g@example.com',
    items: 4,
    total: 21999,
    deliveredDate: '2024-01-16',
    orderDate: '2024-01-11',
    rating: 4,
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    customer: 'Sunita Reddy',
    email: 'sunita.r@example.com',
    items: 2,
    total: 12999,
    deliveredDate: '2024-01-15',
    orderDate: '2024-01-10',
    rating: 5,
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-007',
    customer: 'Rahul Verma',
    email: 'rahul.v@example.com',
    items: 3,
    total: 18999,
    deliveredDate: '2024-01-14',
    orderDate: '2024-01-09',
    rating: 4,
  },
  {
    id: '8',
    orderNumber: 'ORD-2024-008',
    customer: 'Kavita Joshi',
    email: 'kavita.j@example.com',
    items: 1,
    total: 7999,
    deliveredDate: '2024-01-13',
    orderDate: '2024-01-08',
    rating: 5,
  },
  {
    id: '9',
    orderNumber: 'ORD-2024-009',
    customer: 'Sanjay Mehta',
    email: 'sanjay.m@example.com',
    items: 6,
    total: 45999,
    deliveredDate: '2024-01-12',
    orderDate: '2024-01-07',
  },
  {
    id: '10',
    orderNumber: 'ORD-2024-010',
    customer: 'Anjali Desai',
    email: 'anjali.d@example.com',
    items: 2,
    total: 9999,
    deliveredDate: '2024-01-11',
    orderDate: '2024-01-06',
    rating: 4,
  },
];

export default function OrdersCompletedPage() {
  const [orders, setOrders] = useState(completedOrders);

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = orders.reduce((sum, order) => sum + order.items, 0);
  const avgOrderValue = totalRevenue / orders.length;
  const ratedOrders = orders.filter(o => o.rating).length;

  const columns: ColumnDef<CompletedOrder>[] = [
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
        const amount = row.getValue('total') as number;
        const formatted = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'orderDate',
      header: 'Order Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('orderDate'));
        return <div className="text-sm">{date.toLocaleDateString('en-IN')}</div>;
      },
    },
    {
      accessorKey: 'deliveredDate',
      header: 'Delivered',
      cell: ({ row }) => {
        const date = new Date(row.getValue('deliveredDate'));
        return (
          <div>
            <div className="text-sm">{date.toLocaleDateString('en-IN')}</div>
            <Badge variant="default" className="mt-1 bg-green-600">
              Completed
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => {
        const rating = row.original.rating;
        if (!rating) {
          return <span className="text-xs text-muted-foreground">No rating</span>;
        }
        return (
          <div className="flex items-center gap-1">
            <span className="font-medium">{rating}</span>
            <span className="text-yellow-500">⭐</span>
          </div>
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
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
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
        <h1 className="text-3xl font-bold">Completed Orders</h1>
        <p className="text-muted-foreground">View completed orders history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rs {(totalRevenue / 1000).toFixed(1)}k
            </div>
            <p className="text-xs text-muted-foreground">From completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rs {(avgOrderValue / 1000).toFixed(1)}k
            </div>
            <p className="text-xs text-muted-foreground">Per completed order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">{ratedOrders} orders rated</p>
          </CardContent>
        </Card>
      </div>

      {/* Completed Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Orders List</CardTitle>
          <CardDescription>
            All successfully delivered orders with customer ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={orders} 
            searchKey="orderNumber"
            searchPlaceholder="Search completed orders..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
