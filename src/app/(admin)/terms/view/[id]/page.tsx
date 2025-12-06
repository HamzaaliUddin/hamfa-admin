import { TermsView } from '@/app-pages/terms-view';

export default function TermViewPage({ params }: { params: { id: string } }) {
  return <TermsView id={params.id} />;
}

