'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetSettings, useUpdateSettingByKey } from '@/queries/settings';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PaymentSettingsData, defaultPaymentSettings } from './Settings.helper';

const PaymentSettings = () => {
  const [formData, setFormData] = useState<PaymentSettingsData>(defaultPaymentSettings);
  const { data: settingsData, isLoading } = useGetSettings({ category: 'payment' });
  const updateSettingMutation = useUpdateSettingByKey();

  useEffect(() => {
    if (settingsData) {
      const settings = Array.isArray(settingsData) ? settingsData : [];
      const paymentData: PaymentSettingsData = { ...defaultPaymentSettings };
      
      settings.forEach((setting) => {
        if (setting.key === 'stripe_public_key') paymentData.stripePublicKey = setting.value;
        if (setting.key === 'stripe_secret_key') paymentData.stripeSecretKey = setting.value;
        if (setting.key === 'stripe_enabled') paymentData.stripeEnabled = setting.value === 'true';
        if (setting.key === 'paypal_client_id') paymentData.paypalClientId = setting.value;
        if (setting.key === 'paypal_client_secret') paymentData.paypalClientSecret = setting.value;
        if (setting.key === 'paypal_enabled') paymentData.paypalEnabled = setting.value === 'true';
        if (setting.key === 'cod_enabled') paymentData.codEnabled = setting.value === 'true';
        if (setting.key === 'cod_fee') paymentData.codFee = parseFloat(setting.value) || 0;
      });
      
      setFormData(paymentData);
    }
  }, [settingsData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    const settingsToUpdate = [
      { key: 'stripe_public_key', value: formData.stripePublicKey },
      { key: 'stripe_secret_key', value: formData.stripeSecretKey },
      { key: 'stripe_enabled', value: String(formData.stripeEnabled) },
      { key: 'paypal_client_id', value: formData.paypalClientId },
      { key: 'paypal_client_secret', value: formData.paypalClientSecret },
      { key: 'paypal_enabled', value: String(formData.paypalEnabled) },
      { key: 'cod_enabled', value: String(formData.codEnabled) },
      { key: 'cod_fee', value: String(formData.codFee) },
    ];

    for (const setting of settingsToUpdate) {
      await updateSettingMutation.mutateAsync(setting);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
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
                name="stripePublicKey"
                placeholder="pk_test_..."
                type="password"
                value={formData.stripePublicKey}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripeSecretKey">Secret Key *</Label>
              <Input
                id="stripeSecretKey"
                name="stripeSecretKey"
                placeholder="sk_test_..."
                type="password"
                value={formData.stripeSecretKey}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="stripeEnabled"
                checked={formData.stripeEnabled}
                onCheckedChange={(checked) => handleCheckboxChange('stripeEnabled', checked as boolean)}
              />
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
              name="paypalClientId"
              placeholder="AXX..."
              type="password"
              value={formData.paypalClientId}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paypalClientSecret">Client Secret *</Label>
            <Input
              id="paypalClientSecret"
              name="paypalClientSecret"
              placeholder="EXX..."
              type="password"
              value={formData.paypalClientSecret}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="paypalEnabled"
              checked={formData.paypalEnabled}
              onCheckedChange={(checked) => handleCheckboxChange('paypalEnabled', checked as boolean)}
            />
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
            <Checkbox
              id="codEnabled"
              checked={formData.codEnabled}
              onCheckedChange={(checked) => handleCheckboxChange('codEnabled', checked as boolean)}
            />
            <Label htmlFor="codEnabled" className="cursor-pointer">
              Enable Cash on Delivery
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="codFee">COD Fee (optional)</Label>
            <Input
              id="codFee"
              name="codFee"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.codFee}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground">
              Additional fee for COD orders
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} disabled={updateSettingMutation.isPending}>
        {updateSettingMutation.isPending ? 'Saving...' : 'Save All Payment Settings'}
      </Button>
    </div>
  );
};

export default PaymentSettings;

