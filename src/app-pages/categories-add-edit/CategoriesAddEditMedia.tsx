import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UPLOAD_IMAGE_TYPES } from '@/utils/File.util';
import { isValidUrl } from '@/utils/General.util';
import { isEmpty, isString } from 'lodash';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CategoriesAddEditExistingMedia, CategoriesAddEditNewMedia } from './CategoriesAddEditMediaView';

const CategoriesAddEditMedia = ({ isEdit }: { isEdit?: boolean }) => {
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const [useImageUrl, setUseImageUrl] = useState(false);

  const existingFile = watch('existing_image');
  const selectedFile = watch('image');
  const imageUrl = watch('image_url');
  const handleRemove = () => {
    setValue('existing_image', null);
    setValue('image', null);
    setValue('image_url', '');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setValue('image', fileArray);
      setValue('image_url', ''); // Clear URL when file is selected
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setUseImageUrl(checked);
    // Clear both inputs when toggling
    setValue('image', null);
    setValue('image_url', '');
  };

  const isAlreadyAdded =
    isEdit &&
    existingFile &&
    isString(existingFile) &&
    (isValidUrl(existingFile) || existingFile.startsWith('data:'));
  const newFile = selectedFile && selectedFile?.[0];
  const hasUrlPreview = useImageUrl && imageUrl && isValidUrl(imageUrl);

  // Show upload UI only when there's no preview of any kind
  const showUpload = !hasUrlPreview && !newFile && !isAlreadyAdded;

  return (
    <div className="space-y-4">
      {/* Toggle between Upload and URL */}
      {!hasUrlPreview && !newFile && (
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Upload className="text-muted-foreground h-4 w-4" />
            <Label htmlFor="image-toggle" className="cursor-pointer text-sm font-normal">
              {useImageUrl ? 'Enter Image URL' : 'Upload from Device'}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">URL</span>
            <Switch id="image-toggle" checked={useImageUrl} onCheckedChange={handleToggleChange} />
          </div>
        </div>
      )}

      {/* Priority 1: New URL preview (highest priority) */}
      {hasUrlPreview ? (
        <CategoriesAddEditExistingMedia url={imageUrl} handleClear={handleRemove} />
      ) : /* Priority 2: New file preview */
      newFile || !isEmpty(selectedFile) ? (
        <CategoriesAddEditNewMedia file={newFile ? newFile : selectedFile} handleClear={handleRemove} />
      ) : /* Priority 3: Existing image (fallback) */
      isAlreadyAdded ? (
        <CategoriesAddEditExistingMedia url={existingFile} handleClear={handleRemove} />
      ) : null}

      {/* Image URL Input - Show when URL toggle is ON */}
      {useImageUrl && (
        <div className="grid gap-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="image_url"
                type="url"
                placeholder="https://example.com/category-image.jpg"
                className={errors.image_url ? 'border-red-500' : ''}
                onChange={e => {
                  field.onChange(e);
                  // Clear file when typing URL
                  setValue('image', null);
                }}
              />
            )}
          />
          {errors.image_url && (
            <p className="text-sm text-red-500">{errors.image_url?.message as string}</p>
          )}
          <p className="text-muted-foreground text-xs">Enter a valid image URL</p>
        </div>
      )}

      {/* File Upload - Show when URL toggle is OFF */}
      {!useImageUrl && showUpload && (
        <div className="grid gap-2">
          <Label htmlFor="image">Upload Image</Label>
          <div className="relative">
            <label
              htmlFor="image"
              className={`hover:bg-accent flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed ${
                errors.image ? 'border-red-500' : ''
              }`}
            >
              <Upload className="text-muted-foreground h-8 w-8" />
              <span className="text-muted-foreground px-4 text-center text-sm">
                Click to browse or drag and drop a file here
              </span>
              <span className="text-muted-foreground px-4 text-center text-xs">
                Upload a category image
              </span>
              <span className="text-muted-foreground text-xs">
                <strong>Recommended:</strong> 400x400px or larger
              </span>
            </label>
            <input
              id="image"
              type="file"
              accept={UPLOAD_IMAGE_TYPES.join(',')}
              className="hidden"
              onChange={handleFileChange}
              multiple={false}
            />
          </div>
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image?.message as string}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesAddEditMedia;

