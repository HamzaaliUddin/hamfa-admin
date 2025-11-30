'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
};

const CardLayout = ({ title, description, children, headerAction, className }: Props) => {
  return (
    <Card className={className}>
      {(title || description || headerAction) && (
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {headerAction}
          </div>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardLayout;

