'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Edit } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetCategoryById } from '@/queries/categories/useGetCategoryById.query';
import { CrudLayout } from '@/components/common/crud-layout';

type Props = {
  id: string;
};

const CategoriesView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetCategoryById(id);
  const category = data as any;
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
      <div className="max-w-2xl">
        {/* Category Information */}
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
            <CardDescription>Basic details about the category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Category ID</label>
              <p className="mt-1 text-base font-medium">#{category.category_id}</p>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-muted-foreground">Category Name</label>
              <p className="mt-1 text-base font-medium">{category.name}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="mt-1 text-base font-medium capitalize">{category.status || 'active'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Show on Home</label>
                <p className="mt-1 text-base font-medium">{category.show_on_home ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <Separator />

            {!category.show_on_home && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Position</label>
                <p className="mt-1 text-base font-medium">{category.position ?? 'N/A'}</p>
              </div>
            )}

            {category.image && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Image</label>
                  <div className="mt-2 relative aspect-square w-32 overflow-hidden rounded-lg border">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </>
            )}

            {(category.created_at || category.updated_at) && (
              <>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
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
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </CrudLayout>
  );
};

export default CategoriesView;
