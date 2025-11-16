import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function OrdersCompletedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Completed Orders</h1>
        <p className="text-muted-foreground">View completed orders history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Orders List</CardTitle>
          <CardDescription>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              234 orders completed
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Completed orders will be displayed here...</p>
        </CardContent>
      </Card>
    </div>
  );
}

