'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetCollectionById } from '@/queries/collections/useGetCollectionById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Layers, Loader2, Edit, Trash2, Calendar, Package } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function CollectionViewPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.id as string;

  const { data: collection, isLoading, error } = useGetCollectionById(collectionId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="space-y-6">
        <PageHeader title="Collection Details" description="View collection information" />
        <div className="py-10 text-center">
          <Layers className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Collection not found</h2>
          <p className="text-muted-foreground mb-6">
            The collection you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/collections')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/collections')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={collection.name} description={`Slug: ${collection.slug}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[collection.status]}`}>
                  {collection.status.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Products</p>
                <p className="mt-1 font-semibold">{collection.product_count} products</p>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Sort Order</p>
                <p className="mt-1 font-semibold">#{collection.sort_order}</p>
              </div>
              {collection.featured && (
                <>
                  <Separator orientation="vertical" className="hidden h-12 sm:block" />
                  <div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/collections/edit/${collection.collection_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Collection
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
        {/* Collection Image */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={collection.image || '/placeholder.png'}
                alt={collection.name}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Collection Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Collection Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="font-medium">{collection.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Slug</p>
              <p className="font-medium">{collection.slug}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Description</p>
              <p className="text-sm">{collection.description || 'No description'}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[collection.status]}`}>
                  {collection.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Featured</p>
                <Badge className="mt-1" variant={collection.featured ? 'default' : 'secondary'}>
                  {collection.featured ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Sort Order</p>
                <p className="font-medium">#{collection.sort_order}</p>
              </div>
              <div>
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4" />
                  Total Products
                </p>
                <p className="font-medium">{collection.product_count} products</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dates */}
      {(collection.created_at || collection.updated_at) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {collection.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">{format(new Date(collection.created_at), 'PPP p')}</span>
              </div>
            )}
            {collection.updated_at && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="font-medium">{format(new Date(collection.updated_at), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

