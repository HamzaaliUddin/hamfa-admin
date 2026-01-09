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

// Product image preview (square aspect) [Existing Media]
const ProductsAddEditExistingMedia = ({ url, handleClear, title, ...props }: Props) => {
  if (!url) return null;

  // Check if it's a base64 data URL
  const isBase64 = url.startsWith('data:');

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
      {isBase64 ? (
        // Use regular img tag for base64 images
        <img src={url} alt={title || 'product-image'} className="h-full w-full object-cover" />
      ) : (
        // Use Next.js Image for external URLs
        <Image
          src={url}
          alt={title || 'product-image'}
          fill
          className="object-cover"
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

// Product image preview (square aspect) [Newly uploaded media]
const ProductsAddEditNewMedia = ({ url, file, handleClear, ...props }: FileProps) => {
  const imageURL = file ? URL.createObjectURL(file) : url;

  if (!imageURL) return null;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
      <Image
        src={imageURL}
        alt={file?.name || 'uploaded-image'}
        fill
        className="object-cover"
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

export { ProductsAddEditExistingMedia, ProductsAddEditNewMedia };

