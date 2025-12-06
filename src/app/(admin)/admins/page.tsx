import { AdminsList, AdminAdd } from '@/app-pages/admins';
import { CrudLayout } from '@/components/common/crud-layout';

export default function AdminsPage() {
  return (
    <CrudLayout
      title="Admin Management"
      description="Manage admin users and their permissions"
      actionButton={<AdminAdd />}
    >
      <AdminsList />
    </CrudLayout>
  );
}
