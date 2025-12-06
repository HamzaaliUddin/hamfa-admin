'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGetSettings, useUpdateSettingByKey } from '@/queries/settings';
import { useEffect, useState } from 'react';
import { ContactSettingsData, defaultContactSettings } from './Settings.helper';

const ContactSettings = () => {
  const [formData, setFormData] = useState<ContactSettingsData>(defaultContactSettings);
  const { data: settingsData, isLoading } = useGetSettings({ category: 'contact' });
  const updateSettingMutation = useUpdateSettingByKey();

  useEffect(() => {
    if (settingsData) {
      const settings = Array.isArray(settingsData) ? settingsData : [];
      const contactData: ContactSettingsData = { ...defaultContactSettings };
      
      settings.forEach((setting) => {
        if (setting.key === 'contact_phone') contactData.phone = setting.value;
        if (setting.key === 'contact_whatsapp') contactData.whatsapp = setting.value;
        if (setting.key === 'contact_email') contactData.email = setting.value;
        if (setting.key === 'contact_address') contactData.address = setting.value;
        if (setting.key === 'contact_working_hours') contactData.workingHours = setting.value;
        if (setting.key === 'contact_map_url') contactData.mapUrl = setting.value;
      });
      
      setFormData(contactData);
    }
  }, [settingsData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const settingsToUpdate = [
      { key: 'contact_phone', value: formData.phone },
      { key: 'contact_whatsapp', value: formData.whatsapp },
      { key: 'contact_email', value: formData.email },
      { key: 'contact_address', value: formData.address },
      { key: 'contact_working_hours', value: formData.workingHours },
      { key: 'contact_map_url', value: formData.mapUrl },
    ];

    for (const setting of settingsToUpdate) {
      await updateSettingMutation.mutateAsync(setting);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contact@hamfa.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Physical Address *</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="123 Main Street, City, Country"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workingHours">Working Hours</Label>
            <Input
              id="workingHours"
              name="workingHours"
              placeholder="e.g., Mon-Fri: 9AM-6PM"
              value={formData.workingHours}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapUrl">Google Maps Embed URL</Label>
            <Input
              id="mapUrl"
              name="mapUrl"
              type="url"
              placeholder="https://maps.google.com/..."
              value={formData.mapUrl}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground">
              Embed URL for displaying location on contact page
            </p>
          </div>

          <Button type="submit" disabled={updateSettingMutation.isPending}>
            {updateSettingMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactSettings;

