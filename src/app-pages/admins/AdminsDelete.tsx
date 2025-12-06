'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Admin, useDeleteAdmin } from '@/queries/admins';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
  row: Admin;
};

const AdminsDelete = ({ row }: Props) => {
  const { mutate: onDelete, status } = useDeleteAdmin();
  const isLoading = status === 'pending';

  // Don't show delete button for Super Admin
  if (row?.role?.name === 'Super Admin') {
    return null;
  }

  const handleSubmit = () => {
    onDelete(row?.user_id, {
      onSuccess: () => {
        toast.success('Admin deleted successfully');
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Admin</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {row?.name}? This action cannot be undone and will
            revoke all their access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminsDelete;
