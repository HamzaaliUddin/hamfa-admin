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

export default function ContactSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update contact settings
    setTimeout(() => {
      setLoading(false);
      alert('Contact settings updated successfully!');
    }, 1000);
  };

  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Contact Information"
        description="Manage contact details displayed on your website"
        backButton={{
          label: 'Back to Settings',
          href: '/settings',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
            <CardDescription>Information for customers to reach you</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  defaultValue="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@hamfa.com"
                  defaultValue="contact@hamfa.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Physical Address *</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, City, Country"
                  rows={3}
                  defaultValue="123 Main Street, Suite 100, New York, NY 10001"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  placeholder="e.g., Mon-Fri: 9AM-6PM"
                  defaultValue="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapUrl">Google Maps Embed URL</Label>
                <Input
                  id="mapUrl"
                  type="url"
                  placeholder="https://maps.google.com/..."
                />
                <p className="text-sm text-muted-foreground">
                  Embed URL for displaying location on contact page
                </p>
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

