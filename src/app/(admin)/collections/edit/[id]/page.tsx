'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function EditCollectionPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch collection
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update collection
    setTimeout(() => {
      setLoading(false);
      router.push('/collections');
    }, 1000);
  };

  if (isLoading) {
    return (
      <CrudLayout
        title="Loading..."
        description="Please wait"
        backButton={{
          label: 'Back to Collections',
          href: '/collections',
        }}
      >
        <div>Loading collection...</div>
      </CrudLayout>
    );
  }

  return (
    <PermissionGuard module={Module.COLLECTIONS} permission={Permission.UPDATE}>
      <CrudLayout
        title="Edit Collection"
        description="Update collection details"
        backButton={{
          label: 'Back to Collections',
          href: '/collections',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Collection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Collection Name *</Label>
                <Input id="name" placeholder="e.g., Featured Collection" defaultValue="Summer Collection" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  placeholder="e.g., featured-collection"
                  defaultValue="summer-collection"
                  required
                  pattern="[a-z0-9-]+"
                />
                <p className="text-sm text-muted-foreground">
                  URL-friendly name (lowercase, hyphens only)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this collection..."
                  rows={4}
                  defaultValue="Latest summer collection featuring trending styles"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isActive" defaultChecked className="h-4 w-4" />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Set as active
                </Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Collection'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CrudLayout>
    </PermissionGuard>
  );
}

