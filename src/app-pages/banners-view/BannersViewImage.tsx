import { Skeleton } from '@/components/ui/skeleton';
import Image, { StaticImageData } from 'next/image';

type Props = {
  isLoading?: boolean;
  image: string | StaticImageData;
  alt?: string;
};

// Banner preview of 4:1 ratio [same as in web]
const BannersViewImage = ({ isLoading, image, alt }: Props) => {
  return isLoading ? (
    <Skeleton className="h-[250px] w-full" />
  ) : (
    <div className="relative w-full aspect-[4/1] overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={alt || 'banner'}
        fill
        className="object-cover object-center"
      />
    </div>
  );
};

export default BannersViewImage;

