import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssignCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assign Categories</h1>
        <p className="text-muted-foreground">Assign categories to products</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Assignment</CardTitle>
          <CardDescription>Assign and manage product categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

