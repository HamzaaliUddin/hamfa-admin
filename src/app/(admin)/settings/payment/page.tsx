import { PaymentSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Module, Permission } from '@/types/permissions';

export default function PaymentSettingsPage() {
  return (
    <PermissionGuard module={Module.SETTINGS} permission={Permission.VIEW}>
      <CrudLayout
        title="Payment Settings"
        description="Configure payment gateway credentials and options"
      >
        <PaymentSettings />
      </CrudLayout>
    </PermissionGuard>
  );
}
