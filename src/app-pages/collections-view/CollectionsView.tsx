'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetCollectionById } from '@/queries/collections/useGetCollectionById.query';
import { ICollection } from '@/types/api.types';
import { CollectionBadgeColors } from './CollectionsView.helper';
import { CrudLayout } from '@/components/common/crud-layout';

type Props = {
  id: string;
};

const CollectionsView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetCollectionById(id);
  const collection: ICollection = data as any;
  const editURL = makeURL(URLs.CollectionsEdit, { id });

  if (isLoading) {
    return <PageLoader isOpen={isLoading} />;
  }

  if (!collection) {
    return (
      <CrudLayout
        title="Collection Not Found"
        description="The collection you're looking for doesn't exist"
        backButton={{
          label: 'Back to Collections',
          href: URLs.Collections
        }}
      >
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Collection not found</p>
          </CardContent>
        </Card>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout
      title={collection.title}
      description="View collection details"
      backButton={{
        label: 'Back to Collections',
        href: URLs.Collections
      }}
      actionButton={
        <div className="flex gap-2">
          <Button onClick={() => router.push(editURL)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Collection
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content - Left Side */}
        <div className="space-y-6 md:col-span-2">
          {/* Collection Information */}
          <Card>
            <CardHeader>
              <CardTitle>Collection Information</CardTitle>
              <CardDescription>Basic details about the collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Collection Title</label>
                <p className="mt-1 text-base font-medium">{collection.title}</p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Slug</label>
                <p className="mt-1 text-base font-mono text-sm">{collection.slug}</p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="mt-1 text-base">{collection.description || 'No description provided'}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge
                      variant="secondary"
                      className={CollectionBadgeColors?.[collection?.status as 'active' | 'inactive']}
                    >
                      {collection.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Featured</label>
                  <div className="mt-1">
                    <Badge variant={collection.featured ? 'default' : 'outline'}>
                      {collection.featured ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Categories Count</label>
                <p className="mt-1 text-base font-medium">{collection.categories_count || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Image */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collection Image</CardTitle>
              <CardDescription>Collection image</CardDescription>
            </CardHeader>
            <CardContent>
              {collection.image ? (
                <div className="flex items-center justify-center rounded-lg border bg-muted/50 p-4">
                  <img
                    src={collection.image}
                    alt={collection.title}
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
          {(collection.created_at || collection.updated_at) && (
            <Card>
              <CardHeader>
                <CardTitle>Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {collection.created_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created At</label>
                    <p className="mt-1 text-sm">
                      {new Date(collection.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                {collection.updated_at && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                      <p className="mt-1 text-sm">
                        {new Date(collection.updated_at).toLocaleDateString('en-US', {
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

export default CollectionsView;

