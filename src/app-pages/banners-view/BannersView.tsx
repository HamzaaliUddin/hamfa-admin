'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetBannerById } from '@/queries/banners/useGetBannerById.query';
import BannersViewImage from './BannersViewImage';

type Props = {
  id: string;
};

const BannersView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetBannerById(id);
  const banner = data;
  const editURL = makeURL(URLs.BannersEdit, { id });

  return (
    <>
      <PageLoader isOpen={isLoading} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(URLs.Banners)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">
              Banner #{banner?.banner_id}
            </h1>
          </div>
          <Button onClick={() => router.push(editURL)}>Edit Banner</Button>
        </div>

        <Card className="p-6">
          <BannersViewImage isLoading={isLoading} image={banner?.image} />
        </Card>
      </div>
    </>
  );
};

export default BannersView;
