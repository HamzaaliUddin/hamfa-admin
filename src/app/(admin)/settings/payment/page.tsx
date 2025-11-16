'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';
import { CreditCard } from 'lucide-react';

export default function PaymentSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // TODO: API call to update payment settings
    setTimeout(() => {
      setLoading(false);
      alert('Payment settings updated successfully!');
    }, 1000);
  };

  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Payment Settings"
        description="Configure payment gateway credentials and options"
        backButton={{
          label: 'Back to Settings',
          href: '/settings',
        }}
      >
        <div className="space-y-6">
          {/* Stripe */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle>Stripe</CardTitle>
              </div>
              <CardDescription>Configure Stripe payment gateway</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stripePublicKey">Publishable Key *</Label>
                  <Input
                    id="stripePublicKey"
                    placeholder="pk_test_..."
                    type="password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripeSecretKey">Secret Key *</Label>
                  <Input
                    id="stripeSecretKey"
                    placeholder="sk_test_..."
                    type="password"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="stripeEnabled" defaultChecked className="h-4 w-4" />
                  <Label htmlFor="stripeEnabled" className="cursor-pointer">
                    Enable Stripe payments
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PayPal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle>PayPal</CardTitle>
              </div>
              <CardDescription>Configure PayPal payment gateway</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="paypalClientId">Client ID *</Label>
                <Input
                  id="paypalClientId"
                  placeholder="AXX..."
                  type="password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paypalClientSecret">Client Secret *</Label>
                <Input
                  id="paypalClientSecret"
                  placeholder="EXX..."
                  type="password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="paypalEnabled" className="h-4 w-4" />
                <Label htmlFor="paypalEnabled" className="cursor-pointer">
                  Enable PayPal payments
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Cash on Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Cash on Delivery</CardTitle>
              <CardDescription>Enable COD payment option</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="codEnabled" defaultChecked className="h-4 w-4" />
                <Label htmlFor="codEnabled" className="cursor-pointer">
                  Enable Cash on Delivery
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="codFee">COD Fee (optional)</Label>
                <Input
                  id="codFee"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <p className="text-sm text-muted-foreground">
                  Additional fee for COD orders
                </p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save All Payment Settings'}
          </Button>
        </div>
      </CrudLayout>
    </PermissionGuard>
  );
}

