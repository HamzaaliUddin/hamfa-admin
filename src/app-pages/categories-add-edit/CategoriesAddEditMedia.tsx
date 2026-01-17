import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidUrl } from '@/utils/General.util';
import { X, Link, Eye } from 'lucide-react';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';

const CategoriesAddEditMedia = () => {
  const { control, watch } = useFormContext();
  const showOnHome = watch('show_on_home');

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        Category Image URL {showOnHome && <span className="text-destructive">*</span>}
      </Label>

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
                    placeholder="https://example.com/category-image.jpg"
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

              {/* Image Preview */}
              {isValid && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted/30">
                  <Image
                    src={fieldValue}
                    alt="Category image preview"
                    fill
                    unoptimized
                    className="object-cover"
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
  );
};

export default CategoriesAddEditMedia;
