'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function AddCollectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to create collection
    setTimeout(() => {
      setLoading(false);
      router.push('/collections');
    }, 1000);
  };

  return (
    <PermissionGuard module={Module.COLLECTIONS} permission={Permission.CREATE}>
      <CrudLayout
        title="Add Collection"
        description="Create a new product collection"
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
                <Input id="name" placeholder="e.g., Featured Collection" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  placeholder="e.g., featured-collection"
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
                  {loading ? 'Creating...' : 'Create Collection'}
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

