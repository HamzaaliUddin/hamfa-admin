'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminAdd = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/admins/add')}>
      <Plus className="mr-2 h-4 w-4" />
      Add Admin
    </Button>
  );
};

export default AdminAdd;

