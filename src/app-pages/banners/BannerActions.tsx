import { Button } from '@/components/ui/button';
import { Banner } from '@/queries/banners/useGetBanners.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

export const BannerActions = ({ row }: { row: Banner }) => {
  const router = useRouter();
  const bannerViewHandler = () => {
    router.push(`${ROUTES.BANNERS.DETAIL(row.banner_id)}`);
  };

  const bannerEditHandler = () => {
    router.push(`${ROUTES.BANNERS.EDIT(row.banner_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={bannerViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={bannerEditHandler}>
        Edit
      </Button>
    </>
  );
};

