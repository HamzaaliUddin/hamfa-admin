import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserGrowthReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Growth Report</h1>
        <p className="text-muted-foreground">Track user registration and growth trends</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Growth Analytics</CardTitle>
          <CardDescription>User growth reports will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

