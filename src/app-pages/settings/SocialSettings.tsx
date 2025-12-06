'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetSettings, useUpdateSettingByKey } from '@/queries/settings';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SocialSettingsData, defaultSocialSettings } from './Settings.helper';

const SocialSettings = () => {
  const [formData, setFormData] = useState<SocialSettingsData>(defaultSocialSettings);
  const { data: settingsData, isLoading } = useGetSettings({ category: 'social' });
  const updateSettingMutation = useUpdateSettingByKey();

  useEffect(() => {
    if (settingsData) {
      const settings = Array.isArray(settingsData) ? settingsData : [];
      const socialData: SocialSettingsData = { ...defaultSocialSettings };
      
      settings.forEach((setting) => {
        if (setting.key === 'social_facebook') socialData.facebook = setting.value;
        if (setting.key === 'social_twitter') socialData.twitter = setting.value;
        if (setting.key === 'social_instagram') socialData.instagram = setting.value;
        if (setting.key === 'social_youtube') socialData.youtube = setting.value;
        if (setting.key === 'social_linkedin') socialData.linkedin = setting.value;
        if (setting.key === 'social_tiktok') socialData.tiktok = setting.value;
      });
      
      setFormData(socialData);
    }
  }, [settingsData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const settingsToUpdate = [
      { key: 'social_facebook', value: formData.facebook },
      { key: 'social_twitter', value: formData.twitter },
      { key: 'social_instagram', value: formData.instagram },
      { key: 'social_youtube', value: formData.youtube },
      { key: 'social_linkedin', value: formData.linkedin },
      { key: 'social_tiktok', value: formData.tiktok },
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
        <CardTitle>Social Media Profiles</CardTitle>
        <CardDescription>Add links to your social media accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook
            </Label>
            <Input
              id="facebook"
              name="facebook"
              type="url"
              placeholder="https://facebook.com/yourpage"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter / X
            </Label>
            <Input
              id="twitter"
              name="twitter"
              type="url"
              placeholder="https://twitter.com/yourhandle"
              value={formData.twitter}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              name="instagram"
              type="url"
              placeholder="https://instagram.com/yourhandle"
              value={formData.instagram}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </Label>
            <Input
              id="youtube"
              name="youtube"
              type="url"
              placeholder="https://youtube.com/@yourchannel"
              value={formData.youtube}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/company/yourcompany"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              name="tiktok"
              type="url"
              placeholder="https://tiktok.com/@yourhandle"
              value={formData.tiktok}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={updateSettingMutation.isPending}>
            {updateSettingMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SocialSettings;

