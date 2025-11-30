import { UsersList } from '@/app-pages/users';
import { CrudLayout } from '@/components/common/crud-layout';

export default function UsersPage() {
  return (
    <CrudLayout
      title="Users"
      description="View and manage user accounts"
    >
      <UsersList />
    </CrudLayout>
  );
}
