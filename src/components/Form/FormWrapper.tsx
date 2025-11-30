'use client';

import { Card } from '@/components/ui/card';

type Props = {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  asForm?: boolean;
};

export function FormWrapper({ children, className, onSubmit, asForm = false }: Props) {
  const content = <div className="space-y-6 p-6">{children}</div>;

  if (asForm && onSubmit) {
    return (
      <Card className={className}>
        <form onSubmit={onSubmit}>{content}</form>
      </Card>
    );
  }

  return <Card className={className}>{content}</Card>;
}

export default FormWrapper;
