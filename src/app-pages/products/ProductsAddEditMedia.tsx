import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidUrl } from '@/utils/General.util';
import { X, Plus, Link, Eye } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const ProductsAddEditMedia = () => {
  const { setValue, control } = useFormContext();
  const [newImageUrl, setNewImageUrl] = useState('');

  // Use useWatch for reactive updates on additional images
  const additionalImages: string[] = useWatch({ control, name: 'images' }) || [];

  // Handle adding additional image URL
  const handleAddAdditionalImage = () => {
    if (newImageUrl && isValidUrl(newImageUrl)) {
      setValue('images', [...additionalImages, newImageUrl], { shouldDirty: true });
      setNewImageUrl('');
    }
  };

  // Handle removing additional image
  const handleRemoveAdditionalImage = (index: number) => {
    const updated = additionalImages.filter((_, i) => i !== index);
    setValue('images', updated, { shouldDirty: true });
  };

  // Handle key press for adding image on Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAdditionalImage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Product Image */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Main Image URL *</Label>

        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            const fieldValue = field.value || '';
            const isValid = fieldValue && isValidUrl(fieldValue);

            return (
              <>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input
                      value={fieldValue}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      placeholder="https://example.com/product-image.jpg"
                      className="pl-9"
                    />
                  </div>
                  {isValid && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => field.onChange('')}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Main Image Preview */}
                {isValid && (
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted/30">
                    <Image
                      src={fieldValue}
                      alt="Main product"
                      fill
                      unoptimized
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
                      <Eye className="h-3 w-3" />
                      Preview
                    </div>
                  </div>
                )}
              </>
            );
          }}
        />
      </div>

      {/* Additional Images */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional Images</Label>

        {/* Input for adding new image URL */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Add image URL and press Enter"
              className="pl-9"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAddAdditionalImage}
            disabled={!newImageUrl || !isValidUrl(newImageUrl)}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Preview of URL being typed */}
        {newImageUrl && isValidUrl(newImageUrl) && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-dashed border-primary/50 bg-muted/30">
            <Image
              src={newImageUrl}
              alt="Preview"
              fill
              unoptimized
              className="object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
              <Eye className="h-3 w-3" />
              Preview - Press Enter or + to add
            </div>
          </div>
        )}

        {/* Grid of additional images with preview */}
        {additionalImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {additionalImages.map((url: string, index: number) => (
              <div key={`img-${index}`} className="group relative aspect-square overflow-hidden rounded-md border bg-muted/30">
                <Image
                  src={url}
                  alt={`Product ${index + 1}`}
                  fill
                  unoptimized
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalImage(index)}
                  className="absolute right-1 top-1 z-10 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 truncate bg-black/60 px-1 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {additionalImages.length === 0 && (
          <p className="text-muted-foreground text-center text-xs py-4 border-2 border-dashed rounded-lg">
            No additional images added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsAddEditMedia;
