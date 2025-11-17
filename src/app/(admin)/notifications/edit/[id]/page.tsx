'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function EditNotificationPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>('draft');

  useEffect(() => {
    // Simulate API call to fetch notification
    setTimeout(() => {
      setStatus('draft');
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update notification
    setTimeout(() => {
      setLoading(false);
      router.push('/notifications');
    }, 1000);
  };

  if (isLoading) {
    return (
      <CrudLayout
        title="Loading..."
        description="Please wait"
        backButton={{
          label: 'Back to Notifications',
          href: '/notifications',
        }}
      >
        <div>Loading notification...</div>
      </CrudLayout>
    );
  }

  return (
    <PermissionGuard module={Module.NOTIFICATIONS} permission={Permission.UPDATE}>
      <CrudLayout
        title="Edit Notification"
        description="Update notification details"
        backButton={{
          label: 'Back to Notifications',
          href: '/notifications',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Notification Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title"
                  defaultValue="Special Offer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Enter notification message"
                  rows={4}
                  defaultValue="Get 20% off on all products"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target Audience *</Label>
                <Select defaultValue="all" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                    <SelectItem value="segment">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actionUrl">Action URL</Label>
                <Input
                  id="actionUrl"
                  placeholder="/products/sale"
                  defaultValue="/products/sale"
                />
                <p className="text-sm text-muted-foreground">
                  Where users will be redirected when they tap the notification
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledAt">Schedule Send Time</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty to send immediately
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={status} onValueChange={setStatus} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Notification'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CrudLayout>
    </PermissionGuard>
  );
}

