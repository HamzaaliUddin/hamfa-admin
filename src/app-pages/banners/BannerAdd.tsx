'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BannerAdd = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/banners/add')}>
      <Plus className="mr-2 h-4 w-4" />
      Add Banner
    </Button>
  );
};

export default BannerAdd;

