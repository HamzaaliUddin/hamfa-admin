'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetBannerById } from '@/queries/banners/useGetBannerById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Image as ImageIcon, Loader2, Edit, Trash2, MousePointerClick, Calendar } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function BannerViewPage() {
  const params = useParams();
  const router = useRouter();
  const bannerId = params.id as string;

  const { data: banner, isLoading, error } = useGetBannerById(bannerId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !banner) {
    return (
      <div className="space-y-6">
        <PageHeader title="Banner Details" description="View banner information" />
        <div className="py-10 text-center">
          <ImageIcon className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Banner not found</h2>
          <p className="text-muted-foreground mb-6">The banner you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/banners')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Banners
          </Button>
        </div>
      </div>
    );
  }

  const isActive = banner.status === 'active';
  const isScheduled = banner.start_date || banner.end_date;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/banners')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={banner.title} description={`Banner ID: ${banner.banner_id}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[banner.status]}`}>
                  {banner.status.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Sort Order</p>
                <p className="mt-1 font-semibold">#{banner.sort_order}</p>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Clicks</p>
                <p className="mt-1 font-semibold">{banner.click_count}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/banners/edit/${banner.banner_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Banner
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Banner Image */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Banner Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
              <Image src={banner.image || '/placeholder.png'} alt={banner.title} fill className="object-cover" />
            </div>
          </CardContent>
        </Card>

        {/* Banner Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Banner Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Title</p>
              <p className="font-medium">{banner.title}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Description</p>
              <p className="text-sm">{banner.description || 'No description'}</p>
            </div>
            <Separator />
            {banner.redirect_url && (
              <>
                <div>
                  <p className="text-muted-foreground text-sm">Redirect URL</p>
                  <a
                    href={banner.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    {banner.redirect_url}
                  </a>
                </div>
                <Separator />
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Sort Order</p>
                <p className="font-medium">#{banner.sort_order}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`${statusColors[banner.status]}`}>{banner.status.toUpperCase()}</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <MousePointerClick className="h-4 w-4" />
                Click Count
              </p>
              <p className="text-lg font-semibold">{banner.click_count} clicks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule */}
      {isScheduled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {banner.start_date && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-medium">{format(new Date(banner.start_date), 'PPP p')}</span>
              </div>
            )}
            {banner.end_date && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{format(new Date(banner.end_date), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dates */}
      {(banner.created_at || banner.updated_at) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {banner.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">{format(new Date(banner.created_at), 'PPP p')}</span>
              </div>
            )}
            {banner.updated_at && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="font-medium">{format(new Date(banner.updated_at), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

