'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Edit } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetCollectionById } from '@/queries/collections/useGetCollectionById.query';
import { ICollection } from '@/types/api.types';
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
      <div className="space-y-6">
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

            {(collection.created_at || collection.updated_at) && (
              <>
                <Separator />
                <div className="space-y-3">
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

export default CollectionsView;

