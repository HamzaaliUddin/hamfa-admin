import { isEmpty, isString } from 'lodash';
import { Upload } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import type { UploadImagesTypes } from '@/utils/File.util';
import { UPLOAD_IMAGE_TYPES } from '@/utils/File.util';
import { isValidUrl } from '@/utils/General.util';
import { bannersFormRules } from './BannersAddEdit.helper';
import {
  BannersAddEditExistingMedia,
  BannersAddEditNewMedia
} from './BannersAddEditMediaView';

const maxFilesCount = 10;

const BannersAddEditMedia = ({ isEdit }: { isEdit?: boolean }) => {
  const { watch, setValue, register, formState: { errors } } = useFormContext();

  const existingFile = watch('existing_image');
  const selectedFile = watch('image_url');

  const handleRemove = () => {
    setValue('existing_image', null);
    setValue('image_url', null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setValue('image_url', fileArray);
    }
  };

  const formRules = bannersFormRules();

  const isAlreadyAdded =
    isEdit &&
    existingFile &&
    isString(existingFile) &&
    isValidUrl(existingFile);
  const newFile = selectedFile && selectedFile?.[0];

  const showUpload = !isAlreadyAdded && !newFile;

  return (
    <div className="space-y-4">
      {isAlreadyAdded ? (
        // Existing File
        <BannersAddEditExistingMedia
          url={existingFile}
          handleClear={handleRemove}
        />
      ) : selectedFile ? (
        // New File
        newFile || !isEmpty(selectedFile) ? (
          <BannersAddEditNewMedia
            file={newFile ? newFile : selectedFile}
            handleClear={handleRemove}
          />
        ) : null
      ) : null}

      {/* Dropzone */}
      {showUpload && (
        <div className="grid gap-2">
          <Label htmlFor="image_url">Upload Image</Label>
          <div className="relative">
            <label
              htmlFor="image_url"
              className={`flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed hover:bg-accent ${
                errors.image_url ? 'border-red-500' : ''
              }`}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground text-center px-4">
                Click to browse or drag and drop a file here
              </span>
              <span className="text-xs text-muted-foreground text-center px-4">
                Upload a banner image with a 4:1 width to height ratio
              </span>
              <span className="text-xs text-muted-foreground">
                <strong>Recommended size:</strong> 2000x500px (4:1 ratio)
              </span>
            </label>
            <input
              id="image_url"
              type="file"
              accept={UPLOAD_IMAGE_TYPES.join(',')}
              className="hidden"
              onChange={handleFileChange}
              multiple={false}
            />
          </div>
          {errors.image_url && (
            <p className="text-sm text-red-500">
              {errors.image_url?.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BannersAddEditMedia;

