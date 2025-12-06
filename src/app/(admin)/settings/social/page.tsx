import { SocialSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function SocialSettingsPage() {
  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Social Media Links"
        description="Manage your social media profiles"
      >
        <SocialSettings />
      </CrudLayout>
    </PermissionGuard>
  );
}
