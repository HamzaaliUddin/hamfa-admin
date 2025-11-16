import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function SendNotificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Send Notification</h1>
        <p className="text-muted-foreground">Send push notifications to users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Notification</CardTitle>
          <CardDescription>Compose and send notification to users</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notifTitle">Title</Label>
              <Input id="notifTitle" placeholder="Enter notification title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter notification message" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">Target Users</Label>
              <Input id="target" placeholder="All users or specific segment" />
            </div>
            <div className="flex gap-2">
              <Button>Send Now</Button>
              <Button variant="outline">Schedule</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

