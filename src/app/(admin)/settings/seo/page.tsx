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

export default function SEOSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: API call to update SEO settings
    setTimeout(() => {
      setLoading(false);
      alert('SEO settings updated successfully!');
    }, 1000);
  };

  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="SEO Settings"
        description="Configure search engine optimization settings"
        backButton={{
          label: 'Back to Settings',
          href: '/settings',
        }}
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meta Information</CardTitle>
              <CardDescription>Default SEO tags for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title *</Label>
                  <Input
                    id="metaTitle"
                    placeholder="Your Site Title - Short Description"
                    defaultValue="Hamfa - Premium Online Shopping Store"
                    required
                    maxLength={60}
                  />
                  <p className="text-sm text-muted-foreground">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description *</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Brief description of your website..."
                    rows={3}
                    defaultValue="Shop quality products with fast shipping and excellent customer service. Your trusted online shopping destination."
                    required
                    maxLength={160}
                  />
                  <p className="text-sm text-muted-foreground">
                    Recommended: 150-160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Meta Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., online shopping, products, store"
                    defaultValue="online shopping, ecommerce, quality products"
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated keywords (less important for modern SEO)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">Open Graph Image URL</Label>
                  <Input
                    id="ogImage"
                    type="url"
                    placeholder="https://example.com/og-image.jpg"
                    defaultValue="/logo/bg.png"
                  />
                  <p className="text-sm text-muted-foreground">
                    Image shown when sharing on social media (1200x630px recommended)
                  </p>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
              <CardDescription>Third-party tracking codes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                <Input
                  id="googleAnalytics"
                  placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleTagManager">Google Tag Manager ID</Label>
                <Input
                  id="googleTagManager"
                  placeholder="GTM-XXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixel"
                  placeholder="XXXXXXXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </CrudLayout>
    </PermissionGuard>
  );
}

