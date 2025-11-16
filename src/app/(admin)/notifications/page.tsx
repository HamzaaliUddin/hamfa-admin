'use client';

import { useState } from 'react';
import { Bell, Trash2, CheckCircle, AlertCircle, Info, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/data-table';
import { DeleteDialog } from '@/components/common/delete-dialog';
import { notifications as notificationsData, Notification } from '@/data/notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'announcement':
        return <Megaphone className="h-4 w-4 text-purple-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'info':
        return 'secondary';
      case 'announcement':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setDeleteId(null);
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Notification',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          {getNotificationIcon(row.original.type)}
          <div>
            <p className="font-medium">{row.original.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {row.original.message}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }: any) => (
        <Badge variant={getNotificationBadgeVariant(row.original.type)}>
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: 'recipients',
      header: 'Recipients',
    },
    {
      accessorKey: 'sentAt',
      header: 'Sent At',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'sent' ? 'default' : 'destructive'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const notification = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteId(notification.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage push notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/notifications/announcements">
              <Megaphone className="mr-2 h-4 w-4" />
              Announcements
            </Link>
          </Button>
          <Button asChild>
            <Link href="/notifications/send">
              <Bell className="mr-2 h-4 w-4" />
              Send Notification
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sent</CardDescription>
            <CardTitle className="text-3xl">{notifications.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Success</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {notifications.filter(n => n.status === 'sent').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-3xl">5</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Recipients</CardDescription>
            <CardTitle className="text-3xl">1.2K+</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>All sent notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={notifications} searchKey="title" />
        </CardContent>
      </Card>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Notification"
        description="Are you sure you want to delete this notification record?"
      />
    </div>
  );
}
