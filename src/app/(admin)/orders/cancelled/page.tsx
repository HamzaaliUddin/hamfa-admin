import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrdersCancelledPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cancelled Orders</h1>
        <p className="text-muted-foreground">View cancelled orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cancelled Orders List</CardTitle>
          <CardDescription>
            <Badge variant="destructive">18 orders cancelled</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Cancelled orders will be displayed here...</p>
        </CardContent>
      </Card>
    </div>
  );
}

