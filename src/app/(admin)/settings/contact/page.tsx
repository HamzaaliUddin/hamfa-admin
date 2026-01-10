import { ContactSettings } from '@/app-pages/settings';
import { CrudLayout } from '@/components/common/crud-layout';

export default function ContactSettingsPage() {
  return (
    <CrudLayout
      title="Contact Information"
      description="Manage contact details displayed on your website"
    >
      <ContactSettings />
    </CrudLayout>
  );
}
