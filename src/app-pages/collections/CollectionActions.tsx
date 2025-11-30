import { Button } from '@/components/ui/button';
import { Collection } from '@/queries/collections/useGetCollections.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const CollectionActions = ({ row }: { row: Collection }) => {
  const router = useRouter();
  const collectionViewHandler = () => {
    router.push(`${ROUTES.COLLECTIONS.DETAIL(row.collection_id)}`);
  };

  const collectionEditHandler = () => {
    router.push(`${ROUTES.COLLECTIONS.EDIT(row.collection_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={collectionViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={collectionEditHandler}>
        Edit
      </Button>
    </>
  );
};

