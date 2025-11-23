'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetCategoryById } from '@/queries/categories/useGetCategoryById.query';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FolderTree, Loader2, Edit, Trash2, Calendar, Package } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function CategoryViewPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const { data: category, isLoading, error } = useGetCategoryById(categoryId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="space-y-6">
        <PageHeader title="Category Details" description="View category information" />
        <div className="py-10 text-center">
          <FolderTree className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">Category not found</h2>
          <p className="text-muted-foreground mb-6">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/categories')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/categories')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader title={category.name} description={`Slug: ${category.slug}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[category.status]}`}>
                  {category.status.toUpperCase()}
                </Badge>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Products</p>
                <p className="mt-1 font-semibold">{category.product_count} products</p>
              </div>
              <Separator orientation="vertical" className="hidden h-12 sm:block" />
              <div>
                <p className="text-muted-foreground text-sm">Sort Order</p>
                <p className="mt-1 font-semibold">#{category.sort_order}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/categories/edit/${category.category_id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Category
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
        {/* Category Image */}
        <Card>
          <CardHeader>
            <CardTitle>Category Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={category.image || '/placeholder.png'}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            {category.icon && (
              <>
                <p className="text-muted-foreground text-sm">Icon</p>
                <div className="text-center text-3xl">{category.icon}</div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Category Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              Category Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="font-medium">{category.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Slug</p>
              <p className="font-medium">{category.slug}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Description</p>
              <p className="text-sm">{category.description || 'No description'}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={`mt-1 ${statusColors[category.status]}`}>
                  {category.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Sort Order</p>
                <p className="font-medium">#{category.sort_order}</p>
              </div>
            </div>
            <Separator />
            {category.parent_id && (
              <>
                <div>
                  <p className="text-muted-foreground text-sm">Parent Category</p>
                  <Button
                    variant="link"
                    className="h-auto p-0 font-medium"
                    onClick={() => router.push(`/categories/${category.parent_id}`)}
                  >
                    View Parent (#{category.parent_id})
                  </Button>
                </div>
                <Separator />
              </>
            )}
            <div>
              <p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <Package className="h-4 w-4" />
                Total Products
              </p>
              <p className="text-lg font-semibold">{category.product_count} products</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dates */}
      {(category.created_at || category.updated_at) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.created_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created At</span>
                <span className="font-medium">{format(new Date(category.created_at), 'PPP p')}</span>
              </div>
            )}
            {category.updated_at && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated At</span>
                  <span className="font-medium">{format(new Date(category.updated_at), 'PPP p')}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

