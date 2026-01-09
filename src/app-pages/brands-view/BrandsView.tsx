'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetBrandById } from '@/queries/brands/useGetBrandById.query';
import { IBrand } from '@/types/api.types';
import { BrandBadgeColors } from './BrandsView.helper';
import { CrudLayout } from '@/components/common/crud-layout';

type Props = {
  id: string;
};

const BrandsView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetBrandById(id);
  const brand: IBrand = data as any;
  const editURL = makeURL(URLs.BrandsEdit, { id });

  if (isLoading) {
    return <PageLoader isOpen={isLoading} />;
  }

  if (!brand) {
    return (
      <CrudLayout
        title="Brand Not Found"
        description="The brand you're looking for doesn't exist"
        backButton={{
          label: 'Back to Brands',
          href: URLs.Brands
        }}
      >
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Brand not found</p>
          </CardContent>
        </Card>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout
      title={brand.name}
      description="View brand details"
      backButton={{
        label: 'Back to Brands',
        href: URLs.Brands
      }}
      actionButton={
        <div className="flex gap-2">
          <Button onClick={() => router.push(editURL)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Brand
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content - Left Side */}
        <div className="space-y-6 md:col-span-2">
          {/* Brand Information */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>Basic details about the brand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Brand Name</label>
                <p className="mt-1 text-base font-medium">{brand.name}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge
                      variant="secondary"
                      className={BrandBadgeColors?.[brand?.status as 'active' | 'inactive']}
                    >
                      {brand.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Collection Count</label>
                  <p className="mt-1 text-base font-medium">{(brand as any).collection_count || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Logo */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Logo</CardTitle>
              <CardDescription>Brand logo image</CardDescription>
            </CardHeader>
            <CardContent>
              {brand.logo ? (
                <div className="flex items-center justify-center rounded-lg border bg-muted/50 p-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-[200px] w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-lg border bg-muted/50">
                  <p className="text-sm text-muted-foreground">No logo available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          {(brand.created_at || brand.updated_at) && (
            <Card>
              <CardHeader>
                <CardTitle>Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {brand.created_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created At</label>
                    <p className="mt-1 text-sm">
                      {new Date(brand.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                {brand.updated_at && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                      <p className="mt-1 text-sm">
                        {new Date(brand.updated_at).toLocaleDateString('en-US', {
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

export default BrandsView;
