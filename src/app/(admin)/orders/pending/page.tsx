'use client';

import { DataTable } from '@/components/common/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, Eye, MoreHorizontal, Package } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: string;
  date: string;
};

// Mock pending orders data
const mockPendingOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-1001',
    customer: 'Ahmed Ali',
    email: 'ahmed@example.com',
    items: 3,
    total: 2499.99,
    status: 'pending',
    date: '2024-02-15',
  },
  {
    id: '2',
    orderNumber: '#ORD-1002',
    customer: 'Fatima Khan',
    email: 'fatima@example.com',
    items: 2,
    total: 1899.0,
    status: 'pending',
    date: '2024-02-15',
  },
  {
    id: '3',
    orderNumber: '#ORD-1003',
    customer: 'Hassan Malik',
    email: 'hassan@example.com',
    items: 5,
    total: 3599.5,
    status: 'pending',
    date: '2024-02-15',
  },
  {
    id: '4',
    orderNumber: '#ORD-1004',
    customer: 'Ayesha Siddiqui',
    email: 'ayesha@example.com',
    items: 1,
    total: 999.99,
    status: 'pending',
    date: '2024-02-15',
  },
  {
    id: '5',
    orderNumber: '#ORD-1005',
    customer: 'Bilal Ahmed',
    email: 'bilal@example.com',
    items: 4,
    total: 4299.0,
    status: 'pending',
    date: '2024-02-14',
  },
  {
    id: '6',
    orderNumber: '#ORD-1006',
    customer: 'Zainab Hassan',
    email: 'zainab@example.com',
    items: 2,
    total: 1599.0,
    status: 'pending',
    date: '2024-02-14',
  },
  {
    id: '7',
    orderNumber: '#ORD-1007',
    customer: 'Usman Ali',
    email: 'usman@example.com',
    items: 3,
    total: 2799.99,
    status: 'pending',
    date: '2024-02-14',
  },
  {
    id: '8',
    orderNumber: '#ORD-1008',
    customer: 'Maryam Khan',
    email: 'maryam@example.com',
    items: 6,
    total: 5499.0,
    status: 'pending',
    date: '2024-02-14',
  },
  {
    id: '9',
    orderNumber: '#ORD-1009',
    customer: 'Ali Raza',
    email: 'aliraza@example.com',
    items: 2,
    total: 1299.99,
    status: 'pending',
    date: '2024-02-13',
  },
  {
    id: '10',
    orderNumber: '#ORD-1010',
    customer: 'Sara Ahmed',
    email: 'sara@example.com',
    items: 3,
    total: 2199.0,
    status: 'pending',
    date: '2024-02-13',
  },
  {
    id: '11',
    orderNumber: '#ORD-1011',
    customer: 'Hamza Khan',
    email: 'hamza@example.com',
    items: 4,
    total: 3899.99,
    status: 'pending',
    date: '2024-02-13',
  },
  {
    id: '12',
    orderNumber: '#ORD-1012',
    customer: 'Aisha Malik',
    email: 'aisha@example.com',
    items: 1,
    total: 799.0,
    status: 'pending',
    date: '2024-02-13',
  },
];

export default function OrdersPendingPage() {
  const [orders] = useState<Order[]>(mockPendingOrders);

  const columns = [
    {
      accessorKey: 'orderNumber',
      header: 'Order #',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Package className="text-muted-foreground h-4 w-4" />
          <span className="font-medium">{row.original.orderNumber}</span>
        </div>
      ),
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }: any) => (
        <div>
          <p className="font-medium">{row.original.customer}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }: any) => <Badge variant="secondary">{row.original.items} items</Badge>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }: any) => (
        <span className="font-semibold">Rs {row.original.total.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant="outline" className="gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }: any) => new Date(row.original.date).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
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
              <DropdownMenuItem asChild>
                <Link href={`/orders/view/${order.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as Processing</DropdownMenuItem>
              <DropdownMenuItem>Cancel Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pending Orders</h1>
          <p className="text-muted-foreground">View and manage pending orders</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-lg">
          {orders.length} Pending
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Orders List</CardTitle>
          <CardDescription>Orders awaiting processing</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orders} searchKey="orderNumber" />
        </CardContent>
      </Card>
    </div>
  );
}
