import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  addNewLabel?: string;
  addNewHref?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  addNewLabel,
  addNewHref,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {addNewHref && addNewLabel && (
          <Button asChild>
            <Link href={addNewHref}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {addNewLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

