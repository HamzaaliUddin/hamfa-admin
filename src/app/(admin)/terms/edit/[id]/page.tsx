'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function EditTermsPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string>('terms');

  useEffect(() => {
    // Simulate API call to fetch terms
    setTimeout(() => {
      setType('terms');
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update terms
    setTimeout(() => {
      setLoading(false);
      router.push('/terms');
    }, 1000);
  };

  if (isLoading) {
    return (
      <CrudLayout
        title="Loading..."
        description="Please wait"
        backButton={{
          label: 'Back to Terms',
          href: '/terms',
        }}
      >
        <div>Loading document...</div>
      </CrudLayout>
    );
  }

  return (
    <PermissionGuard module={Module.TERMS} permission={Permission.UPDATE}>
      <CrudLayout
        title="Edit Terms & Conditions"
        description="Update legal document or policy"
        backButton={{
          label: 'Back to Terms',
          href: '/terms',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title *</Label>
                <Input id="title" placeholder="e.g., Terms & Conditions" defaultValue="Terms & Conditions" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Document Type *</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terms">Terms & Conditions</SelectItem>
                    <SelectItem value="privacy">Privacy Policy</SelectItem>
                    <SelectItem value="refund">Refund Policy</SelectItem>
                    <SelectItem value="shipping">Shipping Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version *</Label>
                <Input
                  id="version"
                  placeholder="e.g., 1.0"
                  defaultValue="1.0"
                  required
                  pattern="[0-9]+\.[0-9]+"
                />
                <p className="text-sm text-muted-foreground">Format: Major.Minor (e.g., 1.0)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Enter the full document content here..."
                  rows={15}
                  required
                  className="font-mono text-sm"
                  defaultValue="Sample terms and conditions content..."
                />
                <p className="text-sm text-muted-foreground">Supports HTML and Markdown</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input id="effectiveDate" type="date" defaultValue="2024-01-01" required />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isActive" defaultChecked className="h-4 w-4" />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Set as active
                </Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Document'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CrudLayout>
    </PermissionGuard>
  );
}

