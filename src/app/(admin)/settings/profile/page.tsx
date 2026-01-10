import { ProfileSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';

export default function ProfileSettingsPage() {
  return (
    <CrudLayout
      title="Admin Profile"
      description="Manage your account settings and preferences"
    >
      <ProfileSettings />
    </CrudLayout>
  );
}
