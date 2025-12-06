import { ProfileSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function ProfileSettingsPage() {
  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Admin Profile"
        description="Manage your account settings and preferences"
      >
        <ProfileSettings />
      </CrudLayout>
    </PermissionGuard>
  );
}
