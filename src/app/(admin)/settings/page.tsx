'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update settings
    setTimeout(() => {
      setLoading(false);
      alert('Settings updated successfully!');
    }, 1000);
  };

  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Website Settings"
        description="Configure general website information and branding"
      >
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Basic details about your website</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name *</Label>
                <Input
                  id="siteName"
                  placeholder="e.g., Hamfa Store"
                  defaultValue="Hamfa Store"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title *</Label>
                <Input
                  id="siteTitle"
                  placeholder="e.g., Hamfa - Your Shopping Destination"
                  defaultValue="Hamfa - Your Shopping Destination"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Site Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your website..."
                  rows={4}
                  defaultValue="The best online shopping experience with quality products and excellent service."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email *</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  placeholder="support@hamfa.com"
                  defaultValue="support@hamfa.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  type="url"
                  placeholder="https://example.com/logo.png"
                  defaultValue="/logo/bg.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  type="url"
                  placeholder="https://example.com/favicon.ico"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input
                  id="copyright"
                  placeholder="© 2024 Hamfa. All rights reserved."
                  defaultValue="© 2024 Hamfa. All rights reserved."
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </CrudLayout>
    </PermissionGuard>
  );
}

