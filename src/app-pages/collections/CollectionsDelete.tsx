import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Collection } from '@/queries/collections/useGetCollections.query';
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
import { useDeleteCollection } from '@/queries/collections/useDeleteCollection.query';

type Props = {
  row: Collection;
};

const CollectionsDelete = ({ row }: Props) => {
  const { mutate: onDelete, status } = useDeleteCollection();
  const isLoading = status === 'pending';

  const handleSubmit = () => {
    onDelete(
      row?.collection_id,
      {
        onSuccess: () => {
          toast.success('Collection deleted successfully');
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
          <AlertDialogTitle>Delete Collection</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this collection? This action cannot be undone.
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

export default CollectionsDelete;

