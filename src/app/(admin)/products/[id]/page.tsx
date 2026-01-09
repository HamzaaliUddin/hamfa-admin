'use client';

import { PageHeader } from '@/components/common/page-header';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetProductById } from '@/queries/products/useGetProductById.query';
import { ArrowLeft, Box, DollarSign, Edit, Loader2, Package, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function ProductViewPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { data: product, isLoading, error } = useGetProductById(productId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <PageHeader title="Product Details" description="View product information" />
        <div className="py-10 text-center">
          <Package className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Product not found</h2>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={product.title} description={`SKU: ${product.sku}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <StatusBadge status={product.status} />
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Stock</p>
                <p className="mt-1 font-semibold">{product.stock} units</p>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Size</p>
                <Badge variant="outline" className="mt-1 capitalize">{product.size}</Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Type</p>
                <Badge variant="secondary" className="mt-1 capitalize">{product.product_type}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/products/edit/${product.product_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
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
        {/* Product Images */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {product.images.slice(0, 6).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Information */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Title</p>
                <p className="font-medium">{product.title}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground text-sm">Slug</p>
                <p className="font-mono text-sm">{product.slug}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground text-sm">Description</p>
                <p className="text-sm">{product.description || 'No description'}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">SKU</p>
                  <p className="font-medium font-mono">{product.sku}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Collection</p>
                  <p className="font-medium">
                    {product.collection?.title || `#${product.collection_id}`}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Brand</p>
                  <p className="font-medium">
                    {product.brand?.name || `#${product.brand_id}`}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Product Type</p>
                  <Badge variant="secondary" className="capitalize">
                    {product.product_type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Price</p>
                  <p className="text-lg font-semibold">Rs {product.price}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Size</p>
                  <Badge variant="outline" className="capitalize">{product.size}</Badge>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Stock</p>
                  <p className="font-medium">{product.stock} units</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Low Stock Threshold</p>
                  <p className="font-medium">{product.low_stock_threshold} units</p>
                </div>
              </div>
              {product.stock <= product.low_stock_threshold && (
                <>
                  <Separator />
                  <div className="rounded-lg bg-yellow-50 p-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Low stock warning: Current stock is at or below the threshold
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

