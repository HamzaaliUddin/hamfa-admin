'use client';

import { TermsList } from '@/app-pages/terms';
import { CrudLayout } from '@/components/common/crud-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function TermsAddButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/terms/add')}>
      <Plus className="mr-2 h-4 w-4" />
      Add Term
    </Button>
  );
}

export default function TermsPage() {
  return (
    <CrudLayout
      title="Terms & Conditions"
      description="Manage website terms and policies"
      actionButton={<TermsAddButton />}
    >
      <TermsList />
    </CrudLayout>
  );
}
