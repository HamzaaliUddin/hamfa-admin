'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CrudLayout } from '@/components/common/crud-layout';

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>('active');

  useEffect(() => {
    // Simulate API call to fetch user
    setTimeout(() => {
      setStatus('active');
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update user
    setTimeout(() => {
      setLoading(false);
      router.push('/users');
    }, 1000);
  };

  if (isLoading) {
    return (
      <CrudLayout
        title="Loading..."
        description="Please wait"
        backButton={{
          label: 'Back to Users',
          href: '/users',
        }}
      >
        <div>Loading user...</div>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout
      title="Edit User"
      description="Update user information"
      backButton={{
        label: 'Back to Users',
        href: '/users',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" placeholder="Enter first name" defaultValue="John" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" placeholder="Enter last name" defaultValue="Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                defaultValue="john.doe@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                defaultValue="+91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Account Status *</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="emailVerified" defaultChecked className="h-4 w-4" />
              <Label htmlFor="emailVerified" className="cursor-pointer">
                Email verified
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update User'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </CrudLayout>
  );
}
