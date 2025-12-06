'use client';

import { Button } from '@/components/ui/button';
import { User } from '@/queries/users/useGetUsers.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const UserActions = ({ row }: { row: User }) => {
  const router = useRouter();
  const userViewHandler = () => {
    router.push(`${ROUTES.USERS.DETAIL(row.user_id)}`);
  };

  const userEditHandler = () => {
    router.push(`${ROUTES.USERS.EDIT(row.user_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={userViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={userEditHandler}>
        Edit Status
      </Button>
    </>
  );
};

