'use client';

import { Button } from '@/components/ui/button';
import URLs from '@/utils/URLs.util';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const CollectionAdd = () => {
  const router = useRouter();

  const handleAddCollection = () => {
    router.push(URLs.CollectionsAdd);
  };

  return (
    <Button onClick={handleAddCollection}>
      <Plus className="mr-2 h-4 w-4" />
      Add Collection
    </Button>
  );
};

export default CollectionAdd;

