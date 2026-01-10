import { useEffect, useState } from 'react';

const useImageURL = (file?: File, url?: string) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (file && file instanceof File) {
      const reader = new FileReader();

      reader.onload = () => setImageURL(reader.result as string);
      reader.onerror = () => setImageURL(null);
      reader.readAsDataURL(file);

      return () => {
        reader.abort();
      };
    }

    if (url) {
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  }, [file, url]);

  return imageURL;
};

export default useImageURL;

