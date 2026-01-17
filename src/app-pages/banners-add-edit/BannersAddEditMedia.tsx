import { isEmpty, isString } from 'lodash';
import { Upload } from 'lucide-react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { UPLOAD_IMAGE_TYPES } from '@/utils/File.util';
import { isValidUrl } from '@/utils/General.util';
import { bannersFormRules } from './BannersAddEdit.helper';
import {
  BannersAddEditExistingMedia,
  BannersAddEditNewMedia
} from './BannersAddEditMediaView';

const BannersAddEditMedia = ({ isEdit }: { isEdit?: boolean }) => {
  const {
    setValue,
    control,
    formState: { errors }
  } = useFormContext();

  // Use useWatch for reactive updates
  const existingFile = useWatch({ control, name: 'existing_image' });
  const selectedFile = useWatch({ control, name: 'image' });

  const handleRemove = () => {
    setValue('existing_image', null, { shouldDirty: true });
    setValue('image', null, { shouldDirty: true });
  };

  const normalizeFiles = (value: FileList | File[] | null | undefined) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return Array.from(value);
  };

  const formRules = bannersFormRules();

  const isAlreadyAdded =
    isEdit &&
    existingFile &&
    isString(existingFile) &&
    isValidUrl(existingFile);
  const normalizedFiles = normalizeFiles(selectedFile);
  const newFile = normalizedFiles?.[0];

  const hasNewFile = Boolean(newFile || !isEmpty(normalizedFiles));
  const showUpload = !isAlreadyAdded && !hasNewFile;

  return (
    <div className="space-y-4">
      {hasNewFile ? (
        <BannersAddEditNewMedia
          file={newFile}
          handleClear={handleRemove}
        />
      ) : isAlreadyAdded ? (
        <BannersAddEditExistingMedia
          url={existingFile}
          handleClear={handleRemove}
        />
      ) : null}

      {showUpload && (
        <div className="grid gap-2">
          <Label htmlFor="image">Upload Image</Label>
          <div className="relative">
            <label
              htmlFor="image"
              className={`flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed hover:bg-accent ${
                errors.image ? 'border-red-500' : ''
              }`}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground text-center px-4">
                Click to browse or drag and drop a file here
              </span>
              <span className="text-xs text-muted-foreground">
                <strong>Recommended size:</strong> 1920x600px
              </span>
            </label>
            <Controller
              name="image"
              control={control}
              rules={formRules.image}
              shouldUnregister={false}
              render={({ field }) => (
                <input
                  id="image"
                  type="file"
                  accept={UPLOAD_IMAGE_TYPES.join(',')}
                  className="hidden"
                  multiple={false}
                  ref={field.ref}
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    setValue('existing_image', null, { shouldDirty: true });
                    field.onChange(files);
                  }}
                />
              )}
            />
          </div>
          {errors.image && (
            <p className="text-sm text-red-500">
              {errors.image?.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BannersAddEditMedia;
