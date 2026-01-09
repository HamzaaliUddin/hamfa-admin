'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetUserById } from '@/queries/users/useGetUserById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User as UserIcon, Loader2, Edit, Calendar, Mail } from 'lucide-react';
import { format } from 'date-fns';

export default function UserViewPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data: user, isLoading, error } = useGetUserById(userId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6">
        <PageHeader title="Customer Details" description="View customer information" />
        <div className="py-10 text-center">
          <UserIcon className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Customer not found</h2>
          <p className="text-muted-foreground mb-6">The customer you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/users')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/users')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={user.name} description={`Customer ID: ${user.user_id}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {user.is_active ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
              </div>
              {user.role && (
                <>
                  <Separator orientation="vertical" className="hidden h-12 sm:block" />
                  <div>
                    <p className="text-muted-foreground text-sm">Role</p>
                    <Badge className="mt-1" variant="secondary">
                      {user.role.name}
                    </Badge>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/users/edit/${user.user_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <a href={`mailto:${user.email}`} className="text-primary font-medium hover:underline">
                {user.email}
              </a>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Customer ID</p>
              <p className="font-medium">#{user.user_id}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Account Status</p>
              <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {user.is_active ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">{format(new Date(user.created_at), 'PPP p')}</span>
              </div>
            )}
            {user.updated_at && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="font-medium">{format(new Date(user.updated_at), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
