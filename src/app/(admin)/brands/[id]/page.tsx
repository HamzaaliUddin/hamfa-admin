'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetBrandById } from '@/queries/brands/useGetBrandById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, Loader2, Edit, Trash2, Globe, Calendar } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function BrandViewPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params.id as string;

  const { data: brand, isLoading, error } = useGetBrandById(brandId);
console.log(brand)
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="space-y-6">
        <PageHeader title="Brand Details" description="View brand information" />
        <div className="py-10 text-center">
          <Package className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Brand not found</h2>
          <p className="text-muted-foreground mb-6">The brand you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/brands')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brands
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/brands')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={brand.name} description={`Slug: ${brand.slug}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[brand.status]}`}>
                  {brand.status.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Products</p>
                <p className="mt-1 font-semibold">{brand.product_count || 0} products</p>
              </div>
              {brand.featured && (
                <>
                  <Separator orientation="vertical" className="hidden h-12 sm:block" />
                  <div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/brands/edit/${brand.brand_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Brand
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
        {/* Brand Logo */}
        {brand.logo && (
          <Card>
            <CardHeader>
              <CardTitle>Brand Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image src={brand.logo} alt={brand.name} fill className="object-contain p-4" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Brand Information */}
        <Card className={brand.logo ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Brand Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="font-medium">{brand.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Slug</p>
              <p className="font-medium">{brand.slug}</p>
            </div>
            <Separator />
            {brand.description && (
              <>
                <div>
                  <p className="text-muted-foreground text-sm">Description</p>
                  <p className="text-sm">{brand.description}</p>
                </div>
                <Separator />
              </>
            )}
            {brand.website && (
              <>
                <div>
                  <p className="text-muted-foreground mb-2 text-sm">Website</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={brand.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </div>
                <Separator />
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[brand.status]}`}>{brand.status.toUpperCase()}</Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Featured</p>
                <Badge className="mt-1" variant={brand.featured ? 'default' : 'secondary'}>
                  {brand.featured ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
            {brand.product_count !== undefined && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-sm">Total Products</p>
                  <p className="font-medium">{brand.product_count} products</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dates */}
      {(brand.created_at || brand.updated_at) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {brand.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">{format(new Date(brand.created_at), 'PPP p')}</span>
              </div>
            )}
            {brand.updated_at && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="font-medium">{format(new Date(brand.updated_at), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

