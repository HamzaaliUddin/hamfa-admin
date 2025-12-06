'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Edit } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetCategoryById } from '@/queries/categories/useGetCategoryById.query';
import { ICategory } from '@/types/api.types';
import { CategoryBadgeColors } from './CategoriesView.helper';
import { CrudLayout } from '@/components/common/crud-layout';

type Props = {
  id: string;
};

const CategoriesView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetCategoryById(id);
  const category: ICategory = data as any;
  const editURL = makeURL(URLs.CategoriesEdit, { id });

  if (isLoading) {
    return <PageLoader isOpen={isLoading} />;
  }

  if (!category) {
    return (
      <CrudLayout
        title="Category Not Found"
        description="The category you're looking for doesn't exist"
        backButton={{
          label: 'Back to Categories',
          href: URLs.Categories
        }}
      >
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Category not found</p>
          </CardContent>
        </Card>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout
      title={category.name}
      description="View category details"
      backButton={{
        label: 'Back to Categories',
        href: URLs.Categories
      }}
      actionButton={
        <div className="flex gap-2">
          <Button onClick={() => router.push(editURL)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Category
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content - Left Side */}
        <div className="space-y-6 md:col-span-2">
          {/* Category Information */}
          <Card>
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription>Basic details about the category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category Name</label>
                <p className="mt-1 text-base font-medium">{category.name}</p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Slug</label>
                <p className="mt-1 text-base font-mono text-sm">{category.slug}</p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="mt-1 text-base">{category.description || 'No description provided'}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge
                      variant="secondary"
                      className={CategoryBadgeColors?.[category?.status as 'active' | 'inactive']}
                    >
                      {category.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Parent Category</label>
                  <div className="mt-1">
                    <p className="text-sm">
                      {category.parent_id ? `ID: ${category.parent_id}` : 'None (Root Category)'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Product Count</label>
                <p className="mt-1 text-base font-medium">{category.product_count || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Image */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Image</CardTitle>
              <CardDescription>Category image</CardDescription>
            </CardHeader>
            <CardContent>
              {category.image ? (
                <div className="flex items-center justify-center rounded-lg border bg-muted/50 p-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="max-h-[200px] w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-lg border bg-muted/50">
                  <p className="text-sm text-muted-foreground">No image available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          {(category.created_at || category.updated_at) && (
            <Card>
              <CardHeader>
                <CardTitle>Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.created_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created At</label>
                    <p className="mt-1 text-sm">
                      {new Date(category.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                {category.updated_at && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                      <p className="mt-1 text-sm">
                        {new Date(category.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CrudLayout>
  );
};

export default CategoriesView;

