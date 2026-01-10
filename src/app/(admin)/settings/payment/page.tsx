import { PaymentSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';

export default function PaymentSettingsPage() {
  return (
    <CrudLayout
      title="Payment Settings"
      description="Configure payment gateway credentials and options"
    >
      <PaymentSettings />
    </CrudLayout>
  );
}
