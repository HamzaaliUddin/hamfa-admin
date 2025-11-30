'use client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  isLoading: boolean;
  image?: string;
};

const BrandsViewImage = ({ isLoading, image }: Props) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="aspect-video w-full" />
      </Card>
    );
  }

  if (!image) {
    return null;
  }

  return (
    <Card className="overflow-hidden p-6">
      <div className="flex items-center justify-center">
        <img
          src={image}
          alt="Brand Logo"
          className="max-h-[400px] w-auto object-contain"
        />
      </div>
    </Card>
  );
};

export default BrandsViewImage;

