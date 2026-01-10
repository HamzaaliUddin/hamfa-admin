import { TermsView } from '@/app-pages/terms-view';

type Props = {
  params: Promise<{ id: string }>;
};

const TermViewPage = async ({ params }: Props) => {
  const pageParams = await params;

  return <TermsView id={pageParams?.id} />;
};

export default TermViewPage;

