import { ContactSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function ContactSettingsPage() {
  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Contact Information"
        description="Manage contact details displayed on your website"
      >
        <ContactSettings />
      </CrudLayout>
    </PermissionGuard>
  );
}
