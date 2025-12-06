'use client';

import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetProductById } from '@/queries/products/useGetProductById.query';
import { ArrowLeft, Box, DollarSign, Edit, Loader2, Package, Tag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  out_of_stock: 'bg-red-100 text-red-800',
};

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
                <Badge className={`mt-1 ${statusColors[product.status]}`}>
                  {product.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Stock</p>
                <p className="mt-1 font-semibold">{product.stock} units</p>
              </div>
              {product.featured && (
                <>
                  <Separator orientation="vertical" className="hidden h-12 sm:block" />
                  <div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </>
              )}
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
              <Image
                src={product.image || '/placeholder.png'}
                alt={product.title}
                fill
                className="object-cover"
              />
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
                <p className="text-muted-foreground text-sm">Description</p>
                <p className="text-sm">{product.description || 'No description'}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">SKU</p>
                  <p className="font-medium">{product.sku}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Category ID</p>
                  <p className="font-medium">#{product.category_id}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Brand ID</p>
                  <p className="font-medium">#{product.brand_id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Product Type</p>
                  <Badge variant="secondary">
                    {product.product_type || 'N/A'}
                  </Badge>
                </div>
              </div>
              {product.tags && product.tags.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
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
                   <p className="text-lg font-semibold">Rs {product.price.toFixed(2)}</p>
                 </div>
                 {product.compare_price && (
                   <div>
                     <p className="text-muted-foreground text-sm">Compare Price</p>
                     <p className="text-lg font-semibold text-gray-500 line-through">
                       Rs {product.compare_price.toFixed(2)}
                     </p>
                   </div>
                 )}
               </div>
               <Separator />
               {product.cost && (
                 <>
                   <div>
                     <p className="text-muted-foreground text-sm">Cost</p>
                     <p className="font-medium">Rs {product.cost.toFixed(2)}</p>
                   </div>
                   <Separator />
                 </>
               )}
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

          {product.weight && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Box className="h-5 w-5" />
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm">Weight</p>
                  <p className="font-medium">{product.weight} kg</p>
                </div>
                {product.dimensions && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-muted-foreground mb-2 text-sm">Dimensions</p>
                      <p className="text-sm">
                        {typeof product.dimensions === 'string'
                          ? product.dimensions
                          : JSON.stringify(product.dimensions)}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
