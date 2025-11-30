'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import PageLoader from '@/components/common/PageLoader';
import URLs, { makeURL } from '@/utils/URLs.util';
import { useGetBannerById } from '@/queries/banners/useGetBannerById.query';
import { BannerStatusEnums, IBanner } from '@/types/api.types';
import LabelValue from '@/components/common/LabelValue';
import { BannerBadgeColors } from './BannersView.helper';
import BannersViewImage from './BannersViewImage';

type Props = {
  id: string;
};

const BannersView = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetBannerById(id);
  const banner: IBanner = data as any;
  const editURL = makeURL(URLs.BannersEdit, { id });

  const info = [
    { label: 'Banner Title (English)', value: banner?.title?.en },
    { label: 'Banner Title (Arabic)', value: banner?.title?.ar },
    {
      label: 'Banner Status',
      value: banner?.status,
      className: BannerBadgeColors?.[banner?.status as BannerStatusEnums]
    }
  ];

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
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">
                {banner?.title?.en || 'Banner Details'}
              </h1>
              {banner?.status && (
                <Badge
                  variant="secondary"
                  className={BannerBadgeColors?.[banner?.status as BannerStatusEnums]}
                >
                  {banner?.status}
                </Badge>
              )}
            </div>
          </div>
          <Button onClick={() => router.push(editURL)}>Edit Banner</Button>
        </div>

        <BannersViewImage isLoading={isLoading} image={banner?.image_url} />

        <Card className="p-6">
          <div className="space-y-4">
            {info.map((item, index) => (
              <LabelValue
                key={index}
                label={item?.label}
                value={item?.value}
                className={item?.className}
              />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default BannersView;

