'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CollectionAdd = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/collections/add')}>
      <Plus className="mr-2 h-4 w-4" />
      Add Collection
    </Button>
  );
};

export default CollectionAdd;

