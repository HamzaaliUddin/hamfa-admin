import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function ProductVariantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Variants</h1>
          <p className="text-muted-foreground">Manage product sizes, colors, and variations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variant Management</CardTitle>
          <CardDescription>Product variants will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

