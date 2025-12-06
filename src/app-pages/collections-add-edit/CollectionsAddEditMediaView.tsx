import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image, { ImageProps } from 'next/image';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  url?: string;
  title?: string;
  handleClear?: () => void;
}

interface FileProps extends Props {
  file?: File;
}

// Collection image preview (square) [Existing Media]
const CollectionsAddEditExistingMedia = ({ url, handleClear, title, ...props }: Props) => {
  if (!url) return null;

  // Check if it's a base64 data URL
  const isBase64 = url.startsWith('data:');

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
      {isBase64 ? (
        // Use regular img tag for base64 images
        <img src={url} alt={title || 'collection-image'} className="h-full w-full object-contain p-4" />
      ) : (
        // Use Next.js Image for external URLs
        <Image
          src={url}
          alt={title || 'collection-image'}
          fill
          className="object-contain p-4"
          {...props}
        />
      )}
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={handleClear}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Collection image preview (square) [Newly uploaded media]
const CollectionsAddEditNewMedia = ({ url, file, handleClear, ...props }: FileProps) => {
  const imageURL = file ? URL.createObjectURL(file) : url;

  if (!imageURL) return null;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
      <Image
        src={imageURL}
        alt={file?.name || 'uploaded-image'}
        fill
        className="object-contain p-4"
        {...props}
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={handleClear}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { CollectionsAddEditExistingMedia, CollectionsAddEditNewMedia };

