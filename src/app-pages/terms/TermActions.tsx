'use client';

import { Button } from '@/components/ui/button';
import { Term } from '@/queries/terms/useGetTerms.query';
import ROUTES from '@/utils/route';
import { useRouter } from 'next/navigation';

const TermActions = ({ row }: { row: Term }) => {
  const router = useRouter();
  const termViewHandler = () => {
    router.push(`${ROUTES.TERMS.DETAIL(row.term_id)}`);
  };

  const termEditHandler = () => {
    router.push(`${ROUTES.TERMS.EDIT(row.term_id)}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={termViewHandler}>
        View
      </Button>
      <Button variant="ghost" onClick={termEditHandler}>
        Edit
      </Button>
    </>
  );
};

export default TermActions;

