import { CrudLayout } from '@/components/common/crud-layout';
import { NotificationsList } from '@/app-pages/notifications';

export default function NotificationsPage() {
  return (
    <CrudLayout
      title="Notifications"
      description="Manage system notifications"
    >
      <NotificationsList />
    </CrudLayout>
  );
}
