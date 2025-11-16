import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function SubCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sub Categories</h1>
          <p className="text-muted-foreground">Manage product sub categories</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Sub Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sub Category Management</CardTitle>
          <CardDescription>Sub categories will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

