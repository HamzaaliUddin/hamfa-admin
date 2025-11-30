import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Brand } from '@/queries/brands/useGetBrands.query';
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
import { useDeleteBrand } from '@/queries/brands/useDeleteBrand.query';

type Props = {
  row: Brand;
};

const   BrandsDelete = ({ row }: Props) => {
  const { mutate: onDelete, status } = useDeleteBrand();
  const isLoading = status === 'pending';

  const handleSubmit = () => {
    onDelete(
      row?.brand_id,
      {
        onSuccess: () => {
          toast.success('Brand deleted successfully');
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
          <AlertDialogTitle>Delete Brand</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this brand? This action cannot be undone.
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

export default BrandsDelete;

