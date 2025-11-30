/**
 * Validates file size
 */
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validates file type
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some((type) => {
    if (type.includes('*')) {
      // Handle wildcards like image/*
      const baseType = type.split('/')[0];
      return file.type.startsWith(baseType);
    }
    return file.type === type;
  });
};

/**
 * Gets file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Gets filename without extension
 */
export const getFilenameWithoutExtension = (filename: string): string => {
  return filename.replace(/\.[^/.]+$/, '');
};

/**
 * Converts file to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Downloads a file from URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Creates a blob URL from file
 */
export const createBlobURL = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a blob URL
 */
export const revokeBlobURL = (url: string): void => {
  URL.revokeObjectURL(url);
};

/**
 * Image file types
 */
export const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Document file types
 */
export const DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

/**
 * Checks if file is an image
 */
export const isImageFile = (file: File): boolean => {
  return isValidFileType(file, IMAGE_TYPES);
};

/**
 * Checks if file is a document
 */
export const isDocumentFile = (file: File): boolean => {
  return isValidFileType(file, DOCUMENT_TYPES);
};

// Upload images types - can be a File object or a URL string
export type UploadImagesTypes = File | string;

// Accepted image file types for upload
export const UPLOAD_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Export a default to avoid module issues
const FileUtils = {
  isValidFileSize,
  isValidFileType,
  getFileExtension,
  getFilenameWithoutExtension,
  fileToBase64,
  downloadFile,
  createBlobURL,
  revokeBlobURL,
  isImageFile,
  isDocumentFile,
  IMAGE_TYPES,
  DOCUMENT_TYPES,
  UPLOAD_IMAGE_TYPES,
};

export default FileUtils;

