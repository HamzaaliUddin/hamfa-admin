import { BannersList } from '@/app-pages/banners';
import { CrudLayout } from '@/components/common/crud-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import URLs from '@/utils/URLs.util';

export default function BannersPage() {
  return (
    <CrudLayout
      title="Banners"
      description="Manage banners and promotional images"
      actionButton={
        <Button asChild>
          <Link href={URLs.BannersAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Banner
          </Link>
        </Button>
      }
    >
      <BannersList />
    </CrudLayout>
  );
}
