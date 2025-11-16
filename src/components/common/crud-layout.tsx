import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CrudLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backButton?: {
    label: string;
    href: string;
  };
  actionButton?: React.ReactNode;
}

export function CrudLayout({ children, title, description, backButton, actionButton }: CrudLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {backButton && (
            <Button variant="ghost" size="sm" className="mb-2" asChild>
              <Link href={backButton.href}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backButton.label}
              </Link>
            </Button>
          )}
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {actionButton && <div className="flex-shrink-0">{actionButton}</div>}
      </div>
      {children}
    </div>
  );
}

export function CrudFormSection({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

