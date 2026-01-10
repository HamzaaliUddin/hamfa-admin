'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/hooks/use-permissions';
import { useChangePassword } from '@/queries/auth';
import { PasswordChangeData, ProfileSettingsData } from './Settings.helper';

const ProfileSettings = () => {
  const admin = useAdmin();
  const changePasswordMutation = useChangePassword();
  
  const [profileData, setProfileData] = useState<ProfileSettingsData>({
    name: '',
    email: '',
    avatar: '',
  });

  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileLoading, setProfileLoading] = useState(false);

  // Update profile data when admin data loads
  useEffect(() => {
    if (admin) {
      setProfileData({
        name: admin.name || '',
        email: admin.email || '',
        avatar: admin.avatar || '',
      });
    }
  }, [admin]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);

    // TODO: Implement profile update API
    setTimeout(() => {
      setProfileLoading(false);
    }, 1000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    changePasswordMutation.mutate({
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  // Format role name for display
  const displayRole = admin?.role ? admin.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Super Admin';

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {(profileData.name?.charAt(0) || 'A').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{profileData.name || 'Loading...'}</p>
                <p className="text-sm text-muted-foreground">{profileData.email || ''}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={profileData.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={profileData.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={displayRole} disabled />
            </div>

            <Button type="submit" disabled={profileLoading}>
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password *</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password *</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={8}
              />
              <p className="text-sm text-muted-foreground">
                Minimum 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength={8}
              />
            </div>

            <Button type="submit" disabled={changePasswordMutation.isPending}>
              {changePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
