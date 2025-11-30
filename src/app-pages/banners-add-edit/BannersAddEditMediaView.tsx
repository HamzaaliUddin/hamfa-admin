import { X } from 'lucide-react';
import Image, { ImageProps } from 'next/image';
import { Button } from '@/components/ui/button';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  url?: string;
  title?: string;
  handleClear?: () => void;
}

interface FileProps extends Props {
  file?: File;
}

// Banner preview of 4:1 ratio [same as in web] [Existing Media]
const BannersAddEditExistingMedia = ({
  url,
  handleClear,
  title,
  ...props
}: Props) => {
  if (!url) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
      <Image
        src={url}
        alt={title || 'banner-image'}
        fill
        className="object-cover object-center"
        {...props}
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8"
        onClick={handleClear}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Banner preview of 4:1 ratio [same as in web] [Newly uploaded media]
const BannersAddEditNewMedia = ({
  url,
  file,
  handleClear,
  ...props
}: FileProps) => {
  const imageURL = file ? URL.createObjectURL(file) : url;

  if (!imageURL) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
      <Image
        src={imageURL}
        alt={file?.name || 'uploaded-banner'}
        fill
        className="object-cover object-center"
        {...props}
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8"
        onClick={handleClear}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { BannersAddEditExistingMedia, BannersAddEditNewMedia };

