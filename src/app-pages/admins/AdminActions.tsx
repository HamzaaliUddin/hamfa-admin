'use client';

import { Button } from '@/components/ui/button';
import { Admin } from '@/queries/admins';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const AdminActions = ({ row }: { row: Admin }) => {
  const router = useRouter();

  const adminViewHandler = () => {
    router.push(`${ROUTES.ADMINS.DETAIL(row.user_id)}`);
  };

  const adminEditHandler = () => {
    router.push(`${ROUTES.ADMINS.EDIT(row.user_id)}`);
  };

  const adminPermissionsHandler = () => {
    router.push(`${ROUTES.ADMINS.PERMISSIONS(row.user_id)}`);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={adminViewHandler}>
        View
      </Button>
      <Button variant="ghost" size="sm" onClick={adminEditHandler}>
        Edit
      </Button>
      <Button variant="ghost" size="sm" onClick={adminPermissionsHandler}>
        Permissions
      </Button>
    </>
  );
};

export default AdminActions;
