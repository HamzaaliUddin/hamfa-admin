import { BannersList, BannerAdd } from '@/app-pages/banners';
import { CrudLayout } from '@/components/common/crud-layout';

export default function BannersPage() {
  return (
    <CrudLayout
      title="Banners"
      description="Manage banners and promotional images"
      actionButton={<BannerAdd />}
    >
      <BannersList />
    </CrudLayout>
  );
}
