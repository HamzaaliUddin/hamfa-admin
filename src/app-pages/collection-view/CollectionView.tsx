import { Button } from '@/components/ui/button';
import { Collection } from '@/queries/collections/useGetCollections.query';

export const CollectionView = ({ row }: { row: Collection }) => {
  return (
    <>
      <Button variant="ghost">View</Button>
    </>
  );
};

