import { Button } from '@/components/ui/button';
import { User } from '@/queries/users/useGetUsers.query';

export const UserView = ({ row }: { row: User }) => {
  return (
    <>
      <Button variant="ghost">View</Button>
    </>
  );
};

