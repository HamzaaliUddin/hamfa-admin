'use client';

import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

type Props = {
  isOpen: boolean;
};

const PageLoader = ({ isOpen }: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex items-center justify-center border-none bg-transparent shadow-none">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </DialogContent>
    </Dialog>
  );
};

export default PageLoader;

