import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrdersPendingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Orders</h1>
        <p className="text-muted-foreground">View and manage pending orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Orders List</CardTitle>
          <CardDescription>
            <Badge variant="secondary">12 orders pending</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Pending orders will be displayed here...</p>
        </CardContent>
      </Card>
    </div>
  );
}

