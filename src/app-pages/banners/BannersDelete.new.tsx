import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Banner } from '@/queries/banners/useGetBanners.query';
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
import { useDeleteBanner } from '@/queries/banners/useDeleteBanner.query';

type Props = {
  row: Banner;
};

const BannersDelete = ({ row }: Props) => {
  const { mutate: onDelete, status } = useDeleteBanner();
  const isLoading = status === 'pending';

  const handleSubmit = () => {
    onDelete(
      row?.banner_id,
      {
        onSuccess: () => {
          toast.success('Banner deleted successfully');
        }
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-red-600 hover:text-red-700">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Banner</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this banner? This action cannot be undone.
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

export default BannersDelete;

