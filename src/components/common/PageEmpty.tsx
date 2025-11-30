'use client';

import { Package } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
};

const PageEmpty = ({ title = 'No data found', description = 'There are no items to display' }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Package className="h-16 w-16 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageEmpty;

