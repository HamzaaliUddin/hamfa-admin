import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddBannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Banner</h1>
        <p className="text-muted-foreground">Create a new promotional banner</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Information</CardTitle>
          <CardDescription>Upload and configure your banner</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Banner Title</Label>
              <Input id="title" placeholder="Enter banner title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="Enter image URL or upload" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link URL</Label>
              <Input id="link" placeholder="Enter destination URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="middle">Middle Section</SelectItem>
                  <SelectItem value="footer">Footer Section</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button>Save Banner</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

