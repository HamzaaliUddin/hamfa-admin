'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type Props = {
  url?: string;
  onClick?: () => void;
};

const BackArrow = ({ url, onClick }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="rounded-full"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackArrow;

