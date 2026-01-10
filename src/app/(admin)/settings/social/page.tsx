import { SocialSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';

export default function SocialSettingsPage() {
  return (
    <CrudLayout
      title="Social Media Links"
      description="Manage your social media profiles"
    >
      <SocialSettings />
    </CrudLayout>
  );
}
