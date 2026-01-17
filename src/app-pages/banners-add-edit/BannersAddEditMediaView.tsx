import { X, Eye } from 'lucide-react';
import Image, { ImageProps } from 'next/image';
import { Button } from '@/components/ui/button';
import useImageURL from '@/hooks/useImageURL';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  url?: string;
  title?: string;
  handleClear?: () => void;
}

interface FileProps extends Props {
  file?: File;
}

// Banner preview [Existing Media]
const BannersAddEditExistingMedia = ({
  url,
  handleClear,
  title,
  ...props
}: Props) => {
  if (!url) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/30">
      <Image
        src={url}
        alt={title || 'banner-image'}
        fill
        className="object-contain"
        unoptimized
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
      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
        <Eye className="h-3 w-3" />
        Preview
      </div>
    </div>
  );
};

// Banner preview [Newly uploaded media]
const BannersAddEditNewMedia = ({
  url,
  file,
  handleClear,
  ...props
}: FileProps) => {
  const imageURL = useImageURL(file, url);
  if (!imageURL) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/30">
      <Image
        src={imageURL}
        alt={file?.name || 'uploaded-banner'}
        fill
        className="object-contain"
        unoptimized
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
      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
        <Eye className="h-3 w-3" />
        Preview
      </div>
    </div>
  );
};

export { BannersAddEditExistingMedia, BannersAddEditNewMedia };
