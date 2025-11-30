import { Button } from '@/components/ui/button';
import { Banner } from '@/queries/banners/useGetBanners.query';

export const BannerView = ({ row }: { row: Banner }) => {
  return (
    <>
      <Button variant="ghost">View</Button>
    </>
  );
};

