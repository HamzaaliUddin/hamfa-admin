'use client';
import { Button } from '@/components/ui/button';
import URLs from '@/utils/URLs.util';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CategoryAdd = () => {
  const router = useRouter();

  const handleAddCategory = () => {
    router.push(URLs.CategoriesAdd);
  };

  return (
    <Button onClick={handleAddCategory}>
      <Plus className="mr-2 h-4 w-4" />
      Add Category
    </Button>
  );
};

export default CategoryAdd;

