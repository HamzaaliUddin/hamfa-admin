import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Term } from '@/queries/terms/useGetTerms.query';
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
import { useDeleteTerms } from '@/queries/terms/useDeleteTerms.query';

type Props = {
  row: Term;
};

const TermsDelete = ({ row }: Props) => {
  const { mutate: onDelete, status } = useDeleteTerms();
  const isLoading = status === 'pending';

  const handleSubmit = () => {
    onDelete(
      row?.term_id,
      {
        onSuccess: () => {
          toast.success('Term deleted successfully');
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
          <AlertDialogTitle>Delete Term</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this term? This action cannot be undone.
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

export default TermsDelete;

