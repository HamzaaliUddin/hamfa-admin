'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetNotificationById } from '@/queries/notifications/useGetNotificationById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Bell, Loader2, Edit, Trash2, Calendar, Users, MousePointerClick } from 'lucide-react';
import { format } from 'date-fns';

const statusColors = {
  sent: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  scheduled: 'bg-blue-100 text-blue-800',
};

const typeColors = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
  announcement: 'bg-purple-100 text-purple-800',
  error: 'bg-red-100 text-red-800',
};

export default function NotificationViewPage() {
  const params = useParams();
  const router = useRouter();
  const notificationId = params.id as string;

  const { data: notification, isLoading, error } = useGetNotificationById(notificationId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notification Details" description="View notification information" />
        <div className="py-10 text-center">
          <Bell className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Notification not found</h2>
          <p className="text-muted-foreground mb-6">
            The notification you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/notifications')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notifications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/notifications')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader
            title={notification.title}
            description={`Notification ID: ${notification.notification_id}`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[notification.status]}`}>
                  {notification.status.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Type</p>
                <Badge className={`mt-1 ${typeColors[notification.type]}`}>
                  {notification.type.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Clicks</p>
                <p className="mt-1 font-semibold">{notification.click_count}</p>
              </div>
              {notification.read && (
                <>
                  <Separator orientation="vertical" className="hidden h-12 sm:block" />
                  <div>
                    <Badge variant="secondary">Read</Badge>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/notifications/edit/${notification.notification_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Notification
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Notification Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Title</p>
              <p className="font-medium">{notification.title}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Message</p>
              <p className="text-sm">{notification.message}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Type</p>
                <Badge className={`mt-1 ${typeColors[notification.type]}`}>
                  {notification.type.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[notification.status]}`}>
                  {notification.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <MousePointerClick className="h-4 w-4" />
                Click Count
              </p>
              <p className="text-lg font-semibold">{notification.click_count} clicks</p>
            </div>
          </CardContent>
        </Card>

        {/* Recipients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Recipient Type</p>
              <p className="font-medium capitalize">{notification.recipients}</p>
            </div>
            {notification.recipient_ids && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-sm">Recipient IDs</p>
                  <p className="text-sm">{notification.recipient_ids}</p>
                </div>
              </>
            )}
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Read Status</p>
              <Badge variant={notification.read ? 'default' : 'secondary'}>
                {notification.read ? 'Read' : 'Unread'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule & Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notification.sent_at && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sent At</span>
                  <span className="font-medium">{format(new Date(notification.sent_at), 'PPP p')}</span>
                </div>
                <Separator />
              </>
            )}
            {notification.scheduled_for && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scheduled For</span>
                  <span className="font-medium">
                    {format(new Date(notification.scheduled_for), 'PPP p')}
                  </span>
                </div>
                <Separator />
              </>
            )}
            {notification.created_at && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created At</span>
                  <span className="font-medium">{format(new Date(notification.created_at), 'PPP p')}</span>
                </div>
                <Separator />
              </>
            )}
            {notification.updated_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated At</span>
                <span className="font-medium">{format(new Date(notification.updated_at), 'PPP p')}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

