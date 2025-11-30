'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CategoryAdd = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/categories/add')}>
      <Plus className="mr-2 h-4 w-4" />
      Add Category
    </Button>
  );
};

export default CategoryAdd;

